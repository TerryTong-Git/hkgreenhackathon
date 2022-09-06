from rest_framework import routers
from .api import postViewsets

router = routers.DefaultRouter()
router.register('post', postViewsets , 'post') #hmm

urlpatterns=router.urls 