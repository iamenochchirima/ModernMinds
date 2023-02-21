from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

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
    content = models.TextField()
    cover_image = models.ImageField(
        upload_to=get_cover_image_filepath, null=True, blank=True, default=default_cover_image)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    slug = models.SlugField(max_length=250, unique_for_date='published')
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
