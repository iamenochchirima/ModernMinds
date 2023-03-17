from django import forms
from django.core.exceptions import ValidationError
from .models import Article, SpecialArticle

class ArticleModelForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = '__all__'

    def clean_slug(self):
        slug = self.cleaned_data.get('slug')
        queryset = Article.objects.filter(slug=slug)
        if queryset.exists():
            raise ValidationError('Slug must be unique')
        return slug
    
class SpecialArticleModelForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = '__all__'

    def clean_slug(self):
        slug = self.cleaned_data.get('slug')
        queryset = SpecialArticle.objects.filter(slug=slug)
        if queryset.exists():
            raise ValidationError('Slug must be unique')
        return slug