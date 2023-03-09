from django.urls import path
from .import views

app_name = 'newsletter'

urlpatterns = [
    path('signup/', views.SubscribeNewsletterView.as_view(), name='signup'),
    path('main_newsletter/', views.SendNewsletterView.as_view(), name='main_newsletter'),
    path('verify-nl-email/<str:token>/', views.VerifyNewsletterEmailView.as_view(), name='verify_nl_email'),
]