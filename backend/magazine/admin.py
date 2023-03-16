from django.contrib import admin
from .models import Article, Category
from .forms import ArticleModelForm

@admin.register(Article)
class ArticleModelAdmin(admin.ModelAdmin):
    form = ArticleModelForm
    model = Article
    list_display = ('id', 'issue', 'created_at')

admin.site.register(Category)