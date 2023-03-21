from . import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()

app_name = 'magazine_api'

router.register(r'articles', views.ArticleView)
router.register(r'special-articles', views.SpecialArticleView)
router.register(r'categories', views.CategoryView)

urlpatterns = [
    path('', include(router.urls)),
    path('category/<str:slug>/', views.ArticleListByCategoryView.as_view(), name='articles-by-category'),
    path('search/', views.ArticleSearchView.as_view(), name='article_search'),
]