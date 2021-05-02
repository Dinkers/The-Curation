from datetime import datetime

from django.contrib.auth.models import User
from rest_framework import serializers
from django.utils import timezone

from main.models import City, Place, PlaceImage, Submission


class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = [
            'id',
            'name',
            'website',
            'place_type',
            'address',
            'opening_times',
            'contact_info',
            'key_info',
            'speciality',
            'copy',
            'city'
        ]
