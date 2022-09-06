from rest_framework import viewsets, generics, mixins
from rest_framework.views import APIView
from .serializer import RegisterSerializer, UserSerializer,LoginSerializer
from rest_framework.response import Response
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.GenericAPIView):
    serializer_class= RegisterSerializer
    def post(self, request):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer_instance = serializer.save()
        return Response({
            "user": UserSerializer(serializer_instance, context = self.get_serializer_context()).data,
            "token": AuthToken.objects.create(serializer_instance)[1] #token object returns instance and token, thus 2nd on list
        }) #returns an object

class LoginView(generics.GenericAPIView):
    authentication_classes= (TokenAuthentication,)
    serializer_class = LoginSerializer
    class Meta:
        model = User
         
    def post(self, request):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer_instance = serializer.validated_data #hmmm
        return Response({
            "user": UserSerializer(serializer_instance,context = self.get_serializer_context()).data,
            "token": AuthToken.objects.create(serializer_instance)[1]
        })

class UserView(generics.RetrieveAPIView):
    authentication_classes= (TokenAuthentication,) #is this necessary?
    permission_classes = [IsAuthenticated,]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

       

