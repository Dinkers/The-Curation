from django.contrib.auth.models import User
from rest_framework import serializers

from main.models import City, Place, PlaceImage, Submission


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'url',
            'username',
            'email',
            'groups'
        ]


class PlaceSerializer(serializers.ModelSerializer):

    images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    opening_hours = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    usps = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    vital_infos = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Place
        fields = [
            'id',
            'name',
            'website',
            'place_type',
            'address',
            'email_address',
            'copy',
            'city',
            'images',
            'opening_hours',
            'usps',
            'vital_infos',
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


class PlaceImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlaceImage
        fields = [
            'id',
            'uri',
            'place'
        ]
