from django.urls import path
from .import views

app_name = 'users'

urlpatterns = [
    path('create/', views.CustomUserCreate.as_view(), name="create_user"),
    path('load/', views.LoadUserView.as_view(), name='load-user'),
    path('update/', views.UpdateUser.as_view(), name='update-account'),
    path('delete/', views.DeleteAccount.as_view(), name='delete'),
    path('verify-email/<str:uidb64>/<str:token>/', views.VerifyEmailView.as_view(), name='verify-email'),
    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset/confirm/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('countries/', views.CountryListView.as_view(), name='country-list'),
    path('change-email/', views.ChangeEmailView.as_view(), name='change_email'),

]