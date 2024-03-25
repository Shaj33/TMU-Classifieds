from django.urls import path

from . import views

urlpatterns = [path('',views.index,name='index'),
               path('hello_world/', views.hello_world),
               path('post_ad/', views.post_ad),]