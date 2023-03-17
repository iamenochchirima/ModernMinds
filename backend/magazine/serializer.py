from rest_framework import serializers
from .models import Article, SpecialArticle, Category

class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = "__all__"

class SpecialArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpecialArticle
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"
