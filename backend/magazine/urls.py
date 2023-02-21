from . import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()

app_name = 'magazine_api'

router.register(r'articles', views.ArticleView)

urlpatterns = [
    path('', include(router.urls)),
]