from django.urls import path
from .views import *

urlpatterns=[
    path("create/profile/<str:id>/",CreateUserProfileView.as_view(),name="create_user"),
    path("user/profile/<str:id>/",UserProfileView.as_view(),name="user_profile"),
    path("chat/<str:name>/",ChatView.as_view(),name="chat"),
    path("chat/detail/<str:id>/",DetailedChatView.as_view(),name="detail_chat"),
    path("video_content/<str:id>/",VideoContentView.as_view(),name="video_content"),
    path("video_content/detail/<str:id>/",DetailedVideoContentView.as_view(),name="detail_videocontent"),

    path("url/scrape/",UrlScraperView.as_view(),name="url_scrape"),
    path("chat/query/<str:id>/",ModelQueryView.as_view(),name="chat_query"),

     # path("chat/memory/<str:id>",QueryChatView.as_view(),name="chat_memory"),
]