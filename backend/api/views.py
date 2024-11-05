from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User

from .serailizers import UserSerializer,UserProfileSerializer,ChatSerializer,VideoContentSerializer,ChatMemorySerializer
from .models import UserProfile,Chat,VideoContent,ChatMemory

from .llmmodel import scrapeURL,main,get_chat_name

class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class CreateUserProfileView(generics.CreateAPIView):
    permission_classes=[AllowAny]
    serializer_class=UserProfileSerializer

    def post(self,request,id):
        try:
            user=User.objects.get(id=id)
        except:
            return Response({"message":"User with the given is not existed"})
        serializer=UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            user_instance = get_object_or_404(User, id=id)
            serializer.save(user=user_instance)
            
        return Response(serializer.data)


class UserProfileView(generics.CreateAPIView):
    permission_classes=[AllowAny]
    serializer_class=UserProfileSerializer
    
    def get(self,request,id):
        id=User.objects.get(id=id)
        user=UserProfile.objects.get(user=id)
        serializer=UserProfileSerializer(user)
        return Response(serializer.data)
    
    def patch(self,request,id):
        user=UserProfile.objects.get(id=id)
        serializer=UserProfileSerializer(user,data=request.data,partial=True) 
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)
        return Response(serializer.data)

class ChatView(generics.GenericAPIView):
    queryset=Chat.objects.all()
    permission_classes=[AllowAny]
    serializer_class=ChatSerializer

    def get(self,request,name):
        name=User.objects.get(username=name)
        user=UserProfile.objects.get(user=name)
        chat= Chat.objects.filter(user=user).order_by('-id')
        serializer=ChatSerializer(chat,many=True)
        return Response(serializer.data)

    def post(self,request,name):
        name=User.objects.get(username=name)
        user=UserProfile.objects.get(user=name)
        if user:
            serializer=ChatSerializer(data=request.data)
            if serializer.is_valid():
                user_instance = get_object_or_404(UserProfile, user=name)
                serializer.save(user=user_instance)
           
        return Response(serializer.data)
    
class DetailedChatView(generics.GenericAPIView):
    queryset=VideoContent.objects.all()
    permission_classes=[AllowAny]
    serializer_class=ChatSerializer

    def get(self,request,id):
        chat= Chat.objects.get(id=id)   
        serializer=ChatSerializer(chat)
        return Response(serializer.data)
    
    def patch(self,request,id):
        chat= Chat.objects.get(id=id)
        serializer=ChatSerializer(chat,data=request.data,partial=True) 
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)
        return Response(serializer.data)
    
    def delete(self,request,id):
        chat= Chat.objects.get(id=id)
        chat.delete()

        return Response({"message":"Successfully deleted"})
    
    def put(self,request,id):
        chat= Chat.objects.get(id=id)
        serializer=ChatSerializer(chat,data=request.data) 
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)
        return Response(serializer.data)


class VideoContentView(generics.GenericAPIView):
    queryset=VideoContent.objects.all()
    permission_classes=[AllowAny]

    def get_serializer_class(self):
        return VideoContentSerializer  

    def post(self,request,id):
        chat=Chat.objects.get(id=id)
        if chat:
            serializer=VideoContentSerializer(data=request.data)
            if serializer.is_valid():
                chat_instance = get_object_or_404(Chat, id=id)
                serializer.save(chat=chat_instance)
           
        return Response(serializer.data)
    
    def get(self,request,id):
        chat=Chat.objects.get(id=id)
        video_content= VideoContent.objects.filter(chat=chat)   
        serializer=VideoContentSerializer(video_content,many=True)
        return Response(serializer.data)
    
class DetailedVideoContentView(generics.GenericAPIView):
    queryset=VideoContent.objects.all()
    permission_classes=[AllowAny]
    serializer_class=VideoContentSerializer

    def get(self,request,pk):
        video_content= VideoContent.objects.get(id=pk)   
        serializer=VideoContentSerializer(video_content)
        return Response(serializer.data)
    
    
    def patch(self,request,pk):
        video_content= VideoContent.objects.get(id=pk)
        serializer=VideoContentSerializer(video_content,data=request.data,partial=True) 
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)
        return Response(serializer.data)
    
    def delete(self,request,pk):
        video_content= VideoContent.objects.get(id=pk)
        video_content.delete()

        return Response({"message":"Successfully deleted"})
    
    def put(self,request,pk):
        video_content= VideoContent.objects.get(id=pk)
        serializer=VideoContentSerializer(video_content,data=request.data) 
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)
        return Response(serializer.data)


class UrlScraperView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        try:
            title,content,error = scrapeURL(request.data['url'])
            Chat_title=get_chat_name(content)
            print(Chat_title,"\n\n\n\n\n")
            return Response({"message":content,'chat_title':Chat_title,'title':title,'error':error})
        except :
            pass
        return Response({"message":"Invalid URL"},status=400)
    
class ModelQueryView(APIView):
    permission_classes = [AllowAny]

    def post(self,request,id):
        try:
            query=request.data['query']
            chat = Chat.objects.get(id=id)
            Videocontents = VideoContent.objects.filter(chat=chat.id)
            data=''
            for videocontent in Videocontents:
                data += f'content of the video with name =  {videocontent.url_name} , youtube url link  = {videocontent.url}, content of the url = {videocontent.context}\n\n'
            answer = main(data,query)
            print(videocontent.context)
            return Response({"query":query,"gpt":answer})
        except Exception as e:
            print(e)
            return Response({"error":"Something went Wrong Please Check your connectivity."})
    

############# Haven't Created Chat History's due to no Integration of Langchain #######################
'''
class QueryChatView(generics.GenericAPIView):
    queryset=ChatMemory.objects.all()
    serializer_class = ChatMemorySerializer
    permission_classes = [AllowAny]

    def get(self,request,id):
        chat=Chat.objects.get(id=id)
        data = ChatMemory.objects.filter(chat=chat)
        serializer = ChatSerializer(data,many=True)
        return Response(serializer.data)
    
    def post(self,request,id):
        # try:
            query = request.data['member']
            chat = Chat.objects.get(id=id)
            Videocontents = VideoContent.objects.filter(chat=chat.id)
            data=''
            for videocontent in Videocontents:
                data += f'name =  {videocontent.url_name} , youtube url link  = {videocontent.url}, content of the url = {videocontent.context}\n\n'
            answer = main(data,query)
            req=dict({'csrfmiddlewaretoken':request.data['csrfmiddlewaretoken'],'member':query,'gpt':answer})
            serailizer = ChatMemorySerializer(chat,data=req)
            # print(serailizer.data)
            if serailizer.is_valid():
                # print(serailizer.data)
                return Response({"Hello":answer})
            # #     serailizer.save()
            else:
                return Response({"msg":serailizer.errors})
            # return Response(serailizer.data)
            # return Response({"Hello":"Hello"})
        # except:
        #     pass
        # return Response({"message":"Can't fetch the data"},status=400)

    def patch(self,request,id):
        chat = Chat.objects.get(id=id)
        serializer=VideoContentSerializer(chat,data=request.data,partial=True) 
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)
        return Response(serializer.data)

'''


