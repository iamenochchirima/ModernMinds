# Generated by Django 4.1.6 on 2023-03-16 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('magazine', '0007_alter_article_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='issue',
            field=models.IntegerField(blank=True, default=1),
            preserve_default=False,
        ),
    ]
