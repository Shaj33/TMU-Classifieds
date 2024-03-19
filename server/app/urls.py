from django.urls import path

from . import views

urlpatterns = [path('',views.index,name='index'),
               path('hello_world/', views.hello_world),
               path('get_msgs_list/', views.get_all_lists),
               path('post_message/', views.send_txt_message),]