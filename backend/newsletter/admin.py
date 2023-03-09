from django.contrib import admin
from .models import NewsletterSubscriber

class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_verified', 'subscribed_at')
    list_filter = ('subscribed_at',)

admin.site.register(NewsletterSubscriber, NewsletterSubscriberAdmin)
