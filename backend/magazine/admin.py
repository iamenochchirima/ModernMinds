from django.contrib import admin
from .models import Article, Category, SpecialArticle
from .forms import ArticleModelForm, SpecialArticleModelForm

@admin.register(Article)
class ArticleModelAdmin(admin.ModelAdmin):
    form = ArticleModelForm
    model = Article
    list_display = ('id', 'issue', 'created_at', 'status')

@admin.register(SpecialArticle)
class SpecialArticleModelAdmin(admin.ModelAdmin):
    form = SpecialArticleModelForm
    model = Article
    list_display = ('id','editor_note', 'todays_pick', 'top_story', 'issue', 'created_at', 'status')

admin.site.register(Category)