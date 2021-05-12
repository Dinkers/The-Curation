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


class PlaceImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlaceImage
        fields = [
            'id',
            'uri',
            'place'
        ]


class SubmissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Submission
        fields = [
            'id',
            'submitter_name',
            'place_website',
            'reason_for_submission'
        ]


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = [
            'id',
            'name'
        ]
