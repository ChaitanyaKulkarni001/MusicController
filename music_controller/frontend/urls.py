from .import views
from django.urls import path

urlpatterns = [
    
    path('',views.index,name = 'index.html'),
    path('join/1',views.index,name = 'index.html'), 
    path('join',views.index,name = 'index.html'), 
    path('create',views.index,name = 'index.html'),
    path('room/<str:roomCode>',views.index,name = 'index.html'),
]
