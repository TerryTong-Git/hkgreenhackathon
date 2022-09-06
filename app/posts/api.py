from rest_framework import viewsets, permissions
from .models import posts
from .serializers import postsSerializer
from rest_framework.permissions import BasePermission, SAFE_METHODS

class OwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user == posts.owner

class postViewsets(viewsets.ModelViewSet, OwnerOrReadOnly):
    
    permission_classes = [OwnerOrReadOnly, permissions.IsAuthenticated, permissions.DjangoModelPermissions]

    serializer_class = postsSerializer

    def get_queryset(self):
        return self.request.user.posts.all()  
        
    def perform_create(self, serializer):
        serializer.save(owner = self.request.user) #hmm
    