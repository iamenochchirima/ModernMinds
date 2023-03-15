from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField 
from django.utils.text import slugify
from django_extensions.db.fields import AutoSlugField

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


def get_cover_image_filepath(self, filename):
    return 'cover_images/' + str(self.pk) + '/cover_image.png'


def default_cover_image():
    return "default_image/default_cover_image.png"


class Article(models.Model):

    class ArticleObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover_image = models.ImageField(
        upload_to=get_cover_image_filepath, null=True, blank=True, default=default_cover_image)
    content = RichTextUploadingField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    slug = AutoSlugField(populate_from='title', unique=True)
    issue = models.IntegerField(blank=True)
    status = models.CharField(
        max_length=10, choices=options, default='published')
    editor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='article')
    created_at = models.DateTimeField(default=timezone.now)

    objects = models.Manager()
    postobjects = ArticleObjects()

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
