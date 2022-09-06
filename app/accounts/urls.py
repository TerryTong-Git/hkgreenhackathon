from django.urls import URLPattern, path, include
from .api import  RegisterView, LoginView, UserView
from rest_framework import routers
from knox import views as knox_views

urlpatterns = [ 
    path('auth', include('knox.urls')), #exposing authentication endpoints?
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/user', UserView.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name="knox_logout") #knox's logout view
]