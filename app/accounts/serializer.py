from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
User = get_user_model()

#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required= True, validators = [UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required = True, write_only = True, validators = [validate_password])
    password2 = serializers.CharField(required = True, write_only = True)
    vendor = serializers.BooleanField(required = True)
    
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password','password2', 'email', 'vendor']
        extra_kwargs = {
            "first_name" : { 'required' : True},
            "last_name" : {'required' : True}
        }

    def validate(self, validated_data):
        if validated_data['password'] != validated_data['password2']:
            raise ValidationError({'Password': "Password Fields do not match"})
        return validated_data

    def create(self, validated_data):
        user = User.objects.create_user( #does this forgo the necessity to save?
        validated_data['username'],
        validated_data['email'],
        validated_data['password']
        )
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.vendor = validated_data['vendor']
        user.save()
        if user.vendor == True:
            vendor_group = Group.objects.get(name='vendor')
            vendor_group.user_set.add(user)
        if user.vendor == False:
            vendor_group = Group.objects.get(name='restaurant')
            vendor_group.user_set.add(user)
        return user

#Login Serializer

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField() #not a model serializer so specify inputs

    def validate(self, data):
        print(data)
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError('Invalid Credentials')


#User Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


