from django.contrib import admin
from .models import Article, Category

@admin.register(Article)
class ArticleModelAdmin(admin.ModelAdmin):
    model = Article
    list_display = ('id', 'title', 'special', 'editor_note', 'todays_pick', 'top_story', 'archived', 'issue', 'category', 'created_at', 'status')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'cover_image')

admin.site.register(Category, CategoryAdmin)