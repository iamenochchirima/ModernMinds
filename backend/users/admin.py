from django.contrib import admin
from users.models import UserAccount, Country
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from django.db import models


class UserAdminConfig(UserAdmin):
    model = UserAccount
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('email', 'first_name', 'last_name', 'is_active', 'is_subscribed','is_email_verified', 'is_staff',
                   'is_verified', 'is_admin', 'is_newsletter_sub', 'date_joined')
    ordering = ('-date_joined',)
    list_display = ('id', 'email', 'first_name', 'last_name', 'country', 'gender',
                 'is_email_verified', 'is_newsletter_sub', 'is_subscribed', 'is_active', 'is_staff', 'is_verified', 'is_admin', 'date_joined')
    fieldsets = (
        (None, {'fields': ('email', 'first_name', 'last_name', 'country', 'gender')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_email_verified',
         'is_verified', 'is_admin', 'is_newsletter_sub')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_subscribed', 'is_email_verified', 'is_newsletter_sub', 'is_verified', 'is_admin', 'is_active', 'is_staff',)}
         ),
    )


admin.site.register(UserAccount, UserAdminConfig)
admin.site.register(Country )
