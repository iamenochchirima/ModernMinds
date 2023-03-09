from rest_framework import serializers
from .models import NewsletterSubscriber

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = '__all__'