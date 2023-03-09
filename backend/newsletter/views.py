from rest_framework.views import APIView
import json
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.response import Response
from django.utils.crypto import get_random_string
from rest_framework import status
from django.utils.encoding import force_bytes
from django.core.signing import TimestampSigner, BadSignature
from decouple import config
from .serializer import SubscriberSerializer
from django.contrib.auth import get_user_model
from .models import NewsletterSubscriber
from django.conf import settings
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import (
    Mail, Email, TemplateId, To, DynamicTemplateData, Personalization)
from itsdangerous import TimedSerializer, BadSignature, SignatureExpired

class SubscribeNewsletterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        User = get_user_model()

        # Check if email already exists in subscribers
        if NewsletterSubscriber.objects.filter(email=email).exists():
            return Response({'error': 'Email already subscribed to newsletter'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if user with email exists
            user = User.objects.get(email=email)
            user.is_newsletter_sub = True
            user.save()

            # Save subscriber information
            subscriber = NewsletterSubscriber(
                email=email, first_name=user.first_name, last_name=user.last_name)
            subscriber.save()
        except User.DoesNotExist:
            # Save email only if user doesn't exist
            subscriber = NewsletterSubscriber(
                email=email)
            subscriber.save()

        # Generate verification token
        signer = TimestampSigner()
        subscriber_id = str(subscriber.pk)
        nonce = get_random_string(length=32)
        token = f"{subscriber_id}:{nonce}"
        signed_token = signer.sign(token)
        encoded_token = urlsafe_base64_encode(force_bytes(signed_token))
        verify_url = f"{config('FRONTEND_BASE_URL')}/verify-nl-email/{signed_token}/"

        # Send verification email
        sg = SendGridAPIClient(api_key=config('SENDGRID_API_KEY'))
        from_email = (settings.DEFAULT_FROM_EMAIL)
        to_email = To(email)
        dynamic_template_data = DynamicTemplateData({
            'verification_link': verify_url,
            'email': email
        })
        mail = Mail(from_email, to_email)
        mail.template_id = config('NEWSLETTER_VERIFICATION_TEMPLATE_ID')
        mail.dynamic_template_data = dynamic_template_data
        sg.client.mail.send.post(request_body=mail.get())

        return Response({'success': 'Email subscribed to newsletter and verification email sent'}, status=status.HTTP_200_OK)


class VerifyNewsletterEmailView(APIView):
    
    def get(self, request, token):
        print(token)

        signer = TimestampSigner()
        try:
            # signed_token = urlsafe_base64_decode(token)
            token = signer.unsign(token, max_age=3600)
            subscriber_id, nonce = token.split(':')
            subscriber = NewsletterSubscriber.objects.get(pk=subscriber_id)
            if subscriber.is_verified:
                return Response({'detail': 'Your email has already been verified.'}, status=status.HTTP_400_BAD_REQUEST)
            # if subscriber.nonce != nonce:
            #     return Response({'detail': 'The verification link is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
            subscriber.is_verified = True
            subscriber.save()
            serializer = SubscriberSerializer(subscriber)
            return Response(serializer.data)
        except (BadSignature, SignatureExpired, ValueError, NewsletterSubscriber.DoesNotExist):
            return Response({'detail': 'The verification link is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        
class SendNewsletterView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        # Get all subscribers
        subscribers = NewsletterSubscriber.objects.all().values_list('email', flat=True)
        subscribers = list(subscribers)

        # Send the newsletter
        mail = Mail()
        mail.from_email = Email(settings.DEFAULT_FROM_EMAIL)
        mail.template_id = TemplateId(config('MAIN_NEWSLETTER_TEMPLATE_ID'))

        try:
            sg = SendGridAPIClient(config('SENDGRID_API_KEY'))
            for subscriber in subscribers:
                personalization = Personalization()
                personalization.add_to(Email(subscriber))
                personalization.dynamic_template_data = {
                    'email': subscriber,
                }
                mail.add_personalization(personalization)

            response = sg.send(mail)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(str(e))

        return Response({'message': 'Newsletter sent successfully!'}, status=status.HTTP_200_OK)