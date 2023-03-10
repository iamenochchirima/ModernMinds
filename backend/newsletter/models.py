from django.db import models

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    nonce = models.CharField(max_length=32)

    def __str__(self):
        return self.email

    class Meta:
        ordering = ['-subscribed_at']


