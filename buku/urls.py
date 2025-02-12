from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('search/', views.search, name="search"),
    path('api/books/', views.search_books, name='search_books'),
    path('about/team/', views.ourteam, name="ourteam"),
    path('about/', views.about, name="about"),
]