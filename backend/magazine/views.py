from rest_framework.viewsets import ModelViewSet
from .models import Article
from .serializer import ArticleSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

class ArticleView(ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()