from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from decouple import config
from django.contrib.auth import get_user_model
from .models import NewsletterSubscriber
from django.conf import settings
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import (
    Mail, Email, TemplateId, Personalization)


class SubscribeNewsletterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get('email')
        User = get_user_model()

        # Check if email already exists in subscribers
        if NewsletterSubscriber.objects.filter(email=email).exists():
            return Response({'error': 'Email already subscribed to newsletter'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            user.is_newsletter_sub = True
            user.save()

            subscriber = NewsletterSubscriber(
                email=email, first_name=user.first_name, last_name=user.last_name)
            subscriber.save()

        except User.DoesNotExist:
            subscriber = NewsletterSubscriber(email=email)
            subscriber.save()

        return Response({'message': 'Successfully subscribed to the newsletter'}, status=status.HTTP_201_CREATED)

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
        personalization = Personalization()
        personalization.dynamic_template_data = {
            'email': subscribers,
        }
        personalization.add_to(Email(','.join(subscribers)))
        mail.add_personalization(personalization)

        try:
            sg = SendGridAPIClient(config('SENDGRID_API_KEY'))
            response = sg.send(mail)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(str(e))

        return Response({'message': 'Newsletter sent successfully!'}, status=status.HTTP_200_OK)
