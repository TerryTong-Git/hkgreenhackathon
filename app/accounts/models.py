from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
   vendor = models.BooleanField(default = False, null=True,blank=True)
    