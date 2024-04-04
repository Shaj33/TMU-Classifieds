from django.urls import path

from . import views

urlpatterns = [path('',views.index,name='index'),
                path('hello_world/', views.hello_world),
                path('get_all_ad_listings', views.get_all_ad_listings),
                path('get_single_ad_listing', views.get_single_ad_listing),
                path('close_ad/<int:ad_id>/', views.close_ad),
                path('delete_ad/<int:ad_id>/', views.delete_ad),
                path('get_all_users/', views.get_all_users),
                path('delete_user/<int:user_id>/', views.delete_user),
                path('hello_world/', views.hello_world),          # URL for the hello_world endpoint
                path('login/', views.user_login, name='login'),   # URL for the login page
                path('logout/', views.user_logout, name='logout'),# URL for the logout page
                path('register/', views.register, name='register'),
                path('get_msgs_list/', views.get_msgs_lists),
                path('get_most_recent_all/', views.get_most_recent_all),
                path('send_txt_message', views.send_txt_message),
                path('post_message/', views.send_txt_message),]
