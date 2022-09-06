
from rest_framework.response import Response
from rest_framework import viewsets, generics
from .serializers import listingsSerializer, searchlistingSerializer
from .models import listings
from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS
from django.contrib.auth import get_user_model
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend



User = get_user_model()


# class IsVendororNot(permissions.BasePermission):

#     def has_object_permission(self, request, view, obj):
#         if request.user.vendor
#how to check a users permissions?
#why does the group model just store the permissions but not enforce it?

class ownlistingsAPI(viewsets.ModelViewSet):
    permission_classes = [ permissions.IsAuthenticated, permissions.DjangoModelPermissions]
    serializer_class = listingsSerializer

    def get_queryset(self):
        return self.request.user.user_listings.all()

    def create(self, request):
        #why do we need to get_serializer
        serializer = self.get_serializer(data = request.data) 
        serializer.is_valid(raise_exception = True)
        serializer.context['contributor'] = request.user
        saved = serializer.save()
        return Response(listingsSerializer(saved, context = self.get_serializer_context()).data)

    def partial_update(self, request,pk=None):
        listing = listings.objects.get(pk = pk)
        serializer = listingsSerializer(listing, data=request.data,partial=True) #does this just check it?
        serializer.context['contributor'] = request.user
        serializer.is_valid(raise_exception=True)
        saved = serializer.save()
        return Response(listingsSerializer(saved, context = self.get_serializer_context()).data)

#still allows others like patch, so might need to get rid of that. 
    
class searchlistingsAPI( generics.ListAPIView):

        permission_classes = [permissions.IsAuthenticatedOrReadOnly, permissions.DjangoModelPermissions]
        
        serializer_class = searchlistingSerializer
        queryset = listings.objects.all()
        filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
        filterset_fields = ['ingredient', 'deadline', 'amount_bought']
        search_fields = ['ingredient']
        ordering_fields = ['amount_bought']

        #maybe create a part where they can search for a seller/name of seller.

        #search via query params
        # def get_queryset(self):
        #     queryset = listings.objects.all()
        #     ingredient = self.request.query_params.get('ingredient')
        #     if ingredient is not None:
        #         queryset = queryset.filter(ingredient = ingredient)
        #     return queryset
      



        