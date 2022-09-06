from rest_framework import serializers
from .models import posts

class postsSerializer(serializers.ModelSerializer):
    class Meta:
        model= posts
        fields= "__all__"

