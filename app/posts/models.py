from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class posts(models.Model):
    ingredient = models.CharField(max_length=64)
    price_without_bulk = models.FloatField()
    bulk_minimum = models.IntegerField()
    price_with_bulk = models.FloatField()
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete= models.CASCADE, related_name= "posts", null=True)
    
