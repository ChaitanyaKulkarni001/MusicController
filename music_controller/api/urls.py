from . import views
from django.urls import path

urlpatterns = [
    path('room',views.Roomview.as_view()),
    path('create-room', views.CreateRoomView.as_view()),
    path('get-room', views.GetRoom.as_view())

    # path('',views.main),
    # path('main',views.main)
]