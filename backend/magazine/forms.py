from django import forms
from tinymce.widgets import TinyMCE
from .models import Article


class ArticleAdminForm(forms.ModelForm):
    content = forms.CharField(widget=TinyMCE(attrs={'cols': 80, 'rows': 30}))

    class Meta:
        model = Article
        fields = ['title', 'content', 'author', 'cover_image', 'category', 'slug', 'created_at', 'status', 'editor']
