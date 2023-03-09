# Generated by Django 4.1.6 on 2023-03-04 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_country_useraccount_is_newsletter_subscribed_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='is_newsletter_subscribed',
            new_name='is_newsletter_sub',
        ),
        migrations.AddField(
            model_name='useraccount',
            name='gender',
            field=models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], max_length=10, null=True),
        ),
    ]