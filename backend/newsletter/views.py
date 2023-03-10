from rest_framework.views import APIView
import base64
from rest_framework.response import Response
from django.utils.crypto import get_random_string
from django.shortcuts import get_object_or_404
from rest_framework import status
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
            if user.is_email_verified:
                # Save subscriber information
                subscriber = NewsletterSubscriber(
                    email=email, first_name=user.first_name, last_name=user.last_name, is_verified=True)
                subscriber.save()
                user.is_newsletter_sub = True
                user.save()
            else:
                # Generate verification token
                signer = TimestampSigner()
                subscriber = NewsletterSubscriber(
                    email=email, first_name=user.first_name, last_name=user.last_name)
                subscriber.save()
                subscriber_id = str(subscriber.pk)  # subscriber is now defined before being used
                nonce = get_random_string(length=32)
                subscriber.nonce = nonce
                subscriber.save()
                token = f"{subscriber_id}:{nonce}"
                signed_token = signer.sign(token)
                encoded_token = base64.urlsafe_b64encode(signed_token.encode('utf-8')).decode('utf-8')
                verify_url = f"{config('FRONTEND_BASE_URL')}/verify-nl-email/{encoded_token}/"

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

                return Response({'success': 'Subscribed, verification email sent'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            # Generate verification token
            signer = TimestampSigner()
            subscriber = NewsletterSubscriber(
                email=email)
            subscriber.save()
            subscriber_id = str(subscriber.pk)  # subscriber is now defined before being used
            nonce = get_random_string(length=32)
            subscriber.nonce = nonce
            subscriber.save()
            token = f"{subscriber_id}:{nonce}"
            signed_token = signer.sign(token)
            encoded_token = base64.urlsafe_b64encode(signed_token.encode('utf-8')).decode('utf-8')
            verify_url = f"{config('FRONTEND_BASE_URL')}/verify-nl-email/{encoded_token}/"

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

            return Response({'success': 'Subscribed, verification email sent'}, status=status.HTTP_200_OK)

        return Response({'success': 'Subscribed, email already verified'}, status=status.HTTP_200_OK)


class VerifyNewsletterEmailView(APIView):
    
    def get(self, request, token):
        signer = TimestampSigner()

        UserAccount = get_user_model()

        try:
            signed_token = base64.urlsafe_b64decode(token.encode('utf-8')).decode('utf-8')
            token = signer.unsign(signed_token, max_age=3600)
            subscriber_id, nonce = token.split(':')
            subscriber = NewsletterSubscriber.objects.get(pk=subscriber_id)
            if subscriber.is_verified:
                return Response({'detail': 'Your email has already been verified.'}, status=status.HTTP_400_BAD_REQUEST)
            if subscriber.nonce != nonce:
                return Response({'detail': 'The verification link is invalid.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # get email for the subscriber using subscriber_id
            email = subscriber.email
            
            # check if user exists with the same email
            try:
                user = UserAccount.objects.get(email=email)
                # update the user's is_newsletter_sub and is_email_verified to True
                user.is_newsletter_sub = True
                user.is_email_verified = True
                user.save()
            except UserAccount.DoesNotExist:
                pass
                
            # update the subscriber's is_verified and nonce fields
            nonce = get_random_string(length=32)
            subscriber.is_verified = True
            subscriber.nonce = nonce
            subscriber.save()
            serializer = SubscriberSerializer(subscriber)
            return Response(serializer.data)
        except (BadSignature, SignatureExpired, ValueError, NewsletterSubscriber.DoesNotExist):
            return Response({'detail': 'The verification link is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        
class SendNewsletterView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        subscribers = NewsletterSubscriber.objects.all()
      
        mail = Mail()
        mail.from_email = Email(settings.DEFAULT_FROM_EMAIL)
        mail.template_id = TemplateId(config('MAIN_NEWSLETTER_TEMPLATE_ID'))

        try:
            sg = SendGridAPIClient(config('SENDGRID_API_KEY'))
            for subscriber in subscribers:

                subscriber_id = str(subscriber.pk)
                token = f"{subscriber_id}"
                encoded_token = base64.urlsafe_b64encode(token.encode('utf-8')).decode('utf-8')
                unsubscribe_link = f"{config('FRONTEND_BASE_URL')}/unsubscribe/{encoded_token}/",

                personalization = Personalization()
                personalization.add_to(Email(subscriber.email))
                personalization.dynamic_template_data = {
                    'email': subscriber.email,
                    'unsubscribe_link': unsubscribe_link
                }
                mail.add_personalization(personalization)

            response = sg.send(mail)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(str(e))

        return Response({'message': 'Newsletter sent successfully!'}, status=status.HTTP_200_OK)

class UnsubscribeView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, token):
        try:
            subscriber_id = base64.urlsafe_b64decode(token.encode('utf-8')).decode('utf-8')
        except (TypeError, ValueError):
            return Response({'message': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

        subscriber = get_object_or_404(NewsletterSubscriber, pk=subscriber_id)
        email = subscriber.email
        subscriber.delete()

        UserAccount = get_user_model()
        users = UserAccount.objects.filter(email=email)
        for user in users:
            user.is_newsletter_sub = False
            user.save()

        return Response({'message': f'{email} unsubscribed successfully.'}, status=status.HTTP_200_OK)