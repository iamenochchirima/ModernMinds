# Generated by Django 4.1.6 on 2023-03-09 08:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('newsletter', '0002_newslettersubscriber_is_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='newslettersubscriber',
            name='nonce',
            field=models.CharField(default=django.utils.timezone.now, max_length=32),
            preserve_default=False,
        ),
    ]
