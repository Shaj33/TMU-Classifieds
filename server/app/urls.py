from django.urls import path

from . import views

urlpatterns = [path('',views.index,name='index'),
               path('hello_world/', views.hello_world),
               path('get_all_ad_listings', views.get_all_ad_listings)]