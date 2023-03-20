from rest_framework.viewsets import ModelViewSet
from .models import Article, SpecialArticle, Category
from .serializer import ArticleSerializer, SpecialArticleSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class ArticlesPagination(PageNumberPagination):
    page_size = 3

class ArticleView(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = ArticlesPagination
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    lookup_field = 'slug'
    

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        obj = queryset.get(**filter_kwargs)
        self.check_object_permissions(self.request, obj)
        return obj
    
class SpecialArticleView(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = SpecialArticleSerializer
    queryset = SpecialArticle.objects.all()
    lookup_field = 'slug'

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        obj = queryset.get(**filter_kwargs)
        self.check_object_permissions(self.request, obj)
        return obj
    
class CategoryView(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class ArticlesByCategoryPagination(PageNumberPagination):
    page_size = 2


class ArticleListByCategoryView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ArticleSerializer
    pagination_class = ArticlesByCategoryPagination

    def get(self, request, slug):
        try:
            category = Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            return Response({'error': f'Category "{slug}" does not exist'}, status=404)

        articles = Article.objects.filter(category=category)

        # Paginate the articles queryset
        paginator = self.pagination_class()
        paginated_articles = paginator.paginate_queryset(articles, request)

        serializer = self.serializer_class(paginated_articles, many=True)

        return paginator.get_paginated_response(serializer.data)