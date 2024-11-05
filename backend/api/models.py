from django.db import models

from django.contrib.auth.models import User

class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    profile=models.ImageField(upload_to="uploads/",null=True,blank=True)

    def __str__(self):
        return self.user.username


class Chat(models.Model):
    name=models.CharField(max_length=150,default="new_chat")
    user=models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name 

class VideoContent(models.Model):
    url_name=models.CharField(max_length=200)
    url=models.TextField(max_length=250)
    context=models.TextField(blank=True,null=True)
    chat=models.ForeignKey(Chat,on_delete=models.CASCADE)

    def __str__(self):
        return self.url_name



######  Model is Not Yet Completed  ##########
class ChatMemory(models.Model):
    member = models.TextField(blank=True,null=True)
    gpt = models.TextField(blank=True,null=True)
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)

    def __str__(self):
        return self.user



