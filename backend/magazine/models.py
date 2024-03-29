from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField 
from django.utils.text import slugify
from django_extensions.db.fields import AutoSlugField

User = get_user_model()

def get_category_cover_image(self, filename):
    return 'category_cover/' + str(self.pk) + '/cover_image.png'


class Category(models.Model):
    cover_image = models.ImageField(upload_to=get_category_cover_image, blank=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


def get_cover_image_filepath(self, filename):
    return 'cover_images/' + str(self.pk) + '/cover_image.png'

def get_cover_image_special_filepath(self, filename):
    return 'cover_images_special/' + str(self.pk) + '/cover_image.png'


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
        upload_to=get_cover_image_filepath, blank=True)
    content = RichTextUploadingField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    slug = AutoSlugField(populate_from='title', unique=True)
    editor_note = models.BooleanField(default=False)
    todays_pick = models.BooleanField(default=False)
    top_story = models.BooleanField(default=False)
    special = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    issue = models.CharField(null=True, blank=True, max_length=100)
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

class SpecialArticle(models.Model):
    class SpecialArticleObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover_image = models.ImageField(
        upload_to=get_cover_image_special_filepath, blank=True)
    content = RichTextUploadingField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    editor_note = models.BooleanField(default=False)
    todays_pick = models.BooleanField(default=False)
    top_story = models.BooleanField(default=False)
    archive = models.BooleanField(default=False)
    slug = AutoSlugField(populate_from='title', unique=True)
    issue = models.CharField(null=True, blank=True, max_length=100)
    status = models.CharField(
        max_length=10, choices=options, default='published')
    editor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='special_article')
    created_at = models.DateTimeField(default=timezone.now)

    objects = models.Manager()
    postobjects = SpecialArticleObjects()

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
