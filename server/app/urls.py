from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),              # URL for the home page
    path('hello_world/', views.hello_world),          # URL for the hello_world endpoint
    path('login/', views.user_login, name='login'),   # URL for the login page
    path('logout/', views.user_logout, name='logout'),# URL for the logout page
    path('register/', views.register, name='register'),  # URL for user registration
    path('get_msgs_list/', views.get_all_lists),
    path('get_most_recent_all/', views.get_most_recent_all),
    path('send_txt_message', views.send_txt_message),
    path('post_message/', views.send_txt_message),
]
