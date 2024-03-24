from django.urls import path

from . import views

urlpatterns = [path('',views.index,name='index'),
               path('hello_world/', views.hello_world),
               path('login/', views.user_login, name='login'),  # Add path for login view
               path('logout/', views.user_logout, name='logout'),  # Add path for logout view
    ]