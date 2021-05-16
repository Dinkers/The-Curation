from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework import viewsets

from main.models import City, Place, Submission, PlaceImage
from main.serializers import PlaceSerializer, SubmissionSerializer, CitySerializer, UserSerializer, PlaceImageSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all().order_by('-created_at')
    serializer_class = PlaceSerializer
    # permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ('city', )


class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all().order_by('-date_submitted')
    serializer_class = SubmissionSerializer
    # permission_classes = [permissions.IsAuthenticated]


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all().order_by('-name')
    serializer_class = CitySerializer
    # permission_classes = [permissions.IsAuthenticated]


class PlaceImageViewSet(viewsets.ModelViewSet):
    queryset = PlaceImage.objects.all().order_by('-place')
    serializer_class = PlaceImageSerializer
    # permission_classes = [permissions.IsAuthenticated]
