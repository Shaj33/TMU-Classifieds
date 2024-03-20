from django.urls import path

from . import views

urlpatterns = [path('',views.index,name='index'),
               path('hello_world/', views.hello_world),
               path('get_msgs_list/', views.get_all_lists),
               path('get_most_recent_all/', views.get_most_recent_all),
               path('post_message/', views.send_txt_message),]