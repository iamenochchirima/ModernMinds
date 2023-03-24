from django.contrib import admin
from .models import Article, Category, SpecialArticle
from .forms import ArticleModelForm, SpecialArticleModelForm

@admin.register(Article)
class ArticleModelAdmin(admin.ModelAdmin):
    form = ArticleModelForm
    model = Article
    list_display = ('id', 'title', 'special', 'editor_note', 'todays_pick', 'top_story', 'archived', 'issue', 'category', 'created_at', 'status')

@admin.register(SpecialArticle)
class SpecialArticleModelAdmin(admin.ModelAdmin):
    form = SpecialArticleModelForm
    model = Article
    list_display = ('id', 'title', 'editor_note', 'todays_pick', 'top_story', 'archive', 'category', 'issue', 'created_at', 'status')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'cover_image')

admin.site.register(Category, CategoryAdmin)