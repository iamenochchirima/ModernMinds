from django.contrib import admin
from .models import Article, Category
from .forms import ArticleAdminForm


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    form = ArticleAdminForm

    class Media:
        js = ('tinymce/tinymce.min.js',)

admin.site.register(Category)


