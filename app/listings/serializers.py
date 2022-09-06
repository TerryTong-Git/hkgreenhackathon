from wsgiref import validate
from rest_framework import serializers
from .models import listings

class listingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = listings
        fields = ['ingredient','deadline','seller','amount_bought','bulk_price','contributors', 'id']

    def create(self, validated_data):
        listing = listings.objects.create()
        #default anonymouse as the listing does not include the user instance
        listing.ingredient = validated_data['ingredient']
        listing.deadline = validated_data['deadline']
        listing.seller = validated_data['seller']
        listing.amount_bought = validated_data['amount_bought']
        listing.bulk_price = validated_data['bulk_price']
        listing.contributors.add(self.context['contributor'])
        listing.save()
        return listing

    def update(self, instance, validated_data):
        instance.contributors.add(self.context['contributor'])
        instance.amount_bought += validated_data['amount_bought']
        instance.save()
        return instance

class searchlistingSerializer(serializers.ModelSerializer):
    class Meta:
        model = listings
        fields = ['ingredient','deadline','seller','amount_bought','bulk_price', 'contributors','id']

