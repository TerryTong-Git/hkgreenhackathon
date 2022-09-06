from django.db import models
from django.contrib.auth import get_user_model
from posts.models import posts
User = get_user_model()

# Create your models here.
class listings(models.Model):
    ingredient = models.CharField(max_length = 256, null =True)
    deadline = models.DateTimeField(null=True)
    contributors = models.ManyToManyField(User,related_name="user_listings", blank=True)
    seller = models.ForeignKey(posts, on_delete= models.CASCADE,related_name='restaurants', null=True)
    amount_bought = models.IntegerField(null=True)
    bulk_price = models.IntegerField(null=True)
    #amount_until_bulk_nimumum
    #bulk minimum
    #time_until