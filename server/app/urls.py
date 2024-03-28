from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),              # URL for the home page
    path('hello_world/', views.hello_world),          # URL for the hello_world endpoint
    path('login/', views.user_login, name='login'),   # URL for the login page
    path('logout/', views.user_logout, name='logout'),# URL for the logout page
    path('register/', views.register, name='register'),  # URL for user registration
]