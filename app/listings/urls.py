from django.urls import path, include

from .api import ownlistingsAPI
from .api import searchlistingsAPI
from rest_framework import routers

router = routers.DefaultRouter()
router.register('mylistings', ownlistingsAPI , 'mylistings') #hmm

urlpatterns = [
    path('', include(router.urls) ),
    path('listings', searchlistingsAPI.as_view())
]