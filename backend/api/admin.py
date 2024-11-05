from django.contrib import admin

from .models import UserProfile,Chat,VideoContent,ChatMemory

admin.site.register(UserProfile)
admin.site.register(Chat)
admin.site.register(VideoContent)
admin.site.register(ChatMemory)