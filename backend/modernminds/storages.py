from django.conf import settings
from storages.backends.gcloud import GoogleCloudStorage


class StaticStorage(GoogleCloudStorage):
    location = 'static'
    default_acl = 'publicRead'


class MediaStorage(GoogleCloudStorage):
    location = 'media'
    default_acl = 'publicRead'
    file_overwrite = False

# from django.conf import settings
# from storages.backends.s3boto3 import S3Boto3Storage


# class StaticStorage(S3Boto3Storage):
#     location = 'static'
#     default_acl = 'public-read'


# class MediaStorage(S3Boto3Storage):
#     location = 'media'
#     default_acl = 'public-read'
#     file_overwrite = False