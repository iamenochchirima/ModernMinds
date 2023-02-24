from django.urls import path
from .views import CustomUserCreate, LoadUserView

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('load/', LoadUserView.as_view(), name='load-user'),
]