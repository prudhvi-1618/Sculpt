from rest_framework import serializers

from django.contrib.auth.models import User
from .models import UserProfile,Chat,VideoContent,ChatMemory

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ["id","username","email","password"]
        extra_kwargs={"password":{"write_only":True}}

    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model=UserProfile
        fields="__all__"
    
    
class ChatSerializer(serializers.ModelSerializer):
    user=UserProfileSerializer(read_only=True)
    class Meta:
        model=Chat
        fields=["id","name","user"]

class VideoContentSerializer(serializers.ModelSerializer):
    chat=ChatSerializer(read_only=True)
    class Meta:
        model=VideoContent
        fields=["id","url_name","url","context","chat"]

class ChatMemorySerializer(serializers.ModelSerializer):
    chat = ChatSerializer(read_only=True)
    class Meta:
        model=ChatMemory
        fields='__all__'
