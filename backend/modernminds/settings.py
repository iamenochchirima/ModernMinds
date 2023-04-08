from pathlib import Path
from decouple import config
from google.oauth2 import service_account
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-q&xt=ssmy_3#1nl^w5w$vx1=)ml8f5&u9sdnuf$it1tq%g&wb!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

CSRF_TRUSTED_ORIGINS = [config('CSRF_TRUSTED_ORIGINS')]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_cleanup.apps.CleanupConfig',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'magazine',
    'newsletter',
    'users',

    'storages',
    'tinymce',
    'ckeditor',
    'ckeditor_uploader',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'modernminds.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'modernminds.wsgi.application'

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = (
    'x-requested-with',
    'content-type',
    'accept',
    'origin',
    'authorization',
    'accept-encoding',
    'x-csrftoken',
    'access-control-allow-origin',
    'content-disposition'
)
CORS_ALLOW_METHODS = ('GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS')


CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config('PGDATABASE'),
        'USER': config('PGUSER'),
        'PASSWORD': config('PGPASSWORD'),
        'HOST': config('PGHOST'),
        'PORT': config('PGPORT'),
        'DATABASE_URL': config('DATABASE_URL')
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

EMAIL_BACKEND = 'sendgrid_backend.SendgridBackend'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('HOST_EMAIL')
EMAIL_HOST_PASSWORD = config('HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('HOST_EMAIL')
SENDGRID_API_KEY = config('SENDGRID_API_KEY')

GS_CREDENTIALS = service_account.Credentials.from_service_account_info({
    "type": "service_account",
    "project_id": config("PROJECT_ID"),
    "private_key_id": config("PRIVATE_KEY_ID"),
    "private_key": config("PRIVATE_KEY").replace('\\n', '\n'),
    "client_email": config("CLIENT_EMAIL"),
    "client_id":config("CLIENT_ID"),
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": config("CLIENT_X509_CERT_URL"),
})
GS_PROJECT_ID = config('GCS_PROJECT_ID')
GS_BUCKET_NAME = config('GCS_BUCKET_NAME')
# GS_CREDENTIALS = service_account.Credentials.from_service_account_file(os.path.join(BASE_DIR, 'credentials.json'))

DEFAULT_FILE_STORAGE = 'modernminds.storages.MediaStorage'

STATIC_LOCATION = 'static'
STATIC_URL = f'https://storage.googleapis.com/{GS_BUCKET_NAME}/{STATIC_LOCATION}/'
STATICFILES_STORAGE = 'modernminds.storages.StaticStorage'

MEDIA_LOCATION = 'media'
MEDIA_URL = f'https://storage.googleapis.com/{GS_BUCKET_NAME}/{MEDIA_LOCATION}/'

CKEDITOR_UPLOAD_PATH = 'ckeditor/'

# STATICFILES_STORAGE = 'modernminds.storages.StaticStorage'

# AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY')
# AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
# AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
# AWS_DEFAULT_ACL = None
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}

# AWS_QUERYSTRING_AUTH = False

# STATIC_URL = 'static/'
# MEDIA_URL = 'media/'

# STATIC_ROOT = os.path.join(BASE_DIR, "static")

# MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = "users.UserAccount"

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'CSRF_TRUSTED_ORIGINS': CSRF_TRUSTED_ORIGINS,

}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    "BLACKLIST_AFTER_ROTATION": True,
    'AUTH_TOKEN_CLASSES': (
        'rest_framework_simplejwt.tokens.AccessToken',
    )
}

CKEDITOR_CONFIGS = {
    'default': {

        'toolbar_Custom': [
            {'name': 'document', 'items': [
                'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates']},
            {'name': 'clipboard', 'items': [
                'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
            {'name': 'editing', 'items': [
                'Find', 'Replace', '-', 'SelectAll']},
            {'name': 'forms',
             'items': ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                       'HiddenField']},
            '/',
            {'name': 'basicstyles',
             'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
            {'name': 'paragraph',
             'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-',
                       'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl',
                       'Language']},
            {'name': 'links', 'items': ['Link', 'Unlink', 'Anchor']},
            {'name': 'insert',
             'items': ['Image', 'Youtube', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']},
            '/',
            {'name': 'styles', 'items': [
                'Styles', 'Format', 'Font', 'FontSize']},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'tools', 'items': ['Maximize', 'ShowBlocks']},
            {'name': 'about', 'items': ['CodeSnippet']},
            {'name': 'about', 'items': ['About']},
            '/',  # put this to force next toolbar on new line
            {'name': 'yourcustomtools', 'items': [
                # put the name of your editor.ui.addButton here
                'Preview',
                'Maximize',

            ]},
        ],
        'toolbar': 'Custom',  # put selected toolbar config here
        'toolbarGroups': [{'name': 'document', 'groups': ['mode', 'document', 'doctools']}],
        'height': 400,
        # 'width': '100%',
        'filebrowserWindowHeight': 725,
        'filebrowserWindowWidth': 940,
        'toolbarCanCollapse': True,
        'mathJaxLib': '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML',
        'tabSpaces': 4,
        'extraPlugins': ','.join([
            'uploadimage',
            'image2',  # the responsive image plugin
            # your extra plugins here
            'div',
            'autolink',
            'autoembed',
            'embedsemantic',
            'autogrow',
            # 'devtools',
            'widget',
            'lineutils',
            'clipboard',
            'dialog',
            'dialogui',
            'elementspath',
            'codesnippet',
        ]),
        'image2_captionedClass': 'image-captioned ',
        'image2_responsive': True,
        'image2_disableResizer': True,
        'image2_disableLinkInsertion': True,
        'image2_prefillDimensions': True,
        'image2_captionPlaceholder': 'Caption',
        'image2_config': {
            'hSpace': 10,
            'vSpace': 10
        },
    }
}
 