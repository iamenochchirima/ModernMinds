from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, first_name, last_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_subscribed', True)
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('is_verified', True)
        other_fields.setdefault('is_admin', True)
        other_fields.setdefault('is_email_verified', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, first_name, last_name, password, **other_fields)

    def create_user(self, email, first_name, last_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = 'Countries'
        ordering = ['name'] 

    def __str__(self):
        return self.name

class UserAccount(AbstractBaseUser, PermissionsMixin):

    gender_options = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('non-binary', 'Non-binary'),
        ('other', 'Other'),
    )

    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True)
    gender = models.CharField(
        max_length=10, choices=gender_options, null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_subscribed = models.BooleanField(default=False)
    is_newsletter_sub = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined	= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name' ]

    def __str__(self):
        return self.first_name

    def get_full_name(self):
        return f"{self.first_name}-{self.last_name}" 

    def get_username(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
