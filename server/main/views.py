from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, viewsets, status

from main.models import City, Place, Submission, PlaceImage, PlaceUSP, PlaceVitalInfo
from main.serializers import PlaceSerializer, SubmissionSerializer, CitySerializer, UserSerializer, \
    PlaceImageSerializer, PlaceUSPSerializer, PlaceVitalInfoSerializer


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


@api_view(['GET'])
def filters_list(request, city_id=None):
    """
    List all filters available, filters by city if provided.
    """

    filters_response_data = {
        'usps': [],
        'vital_infos': []
    }

    if city_id:

        try:
            city = City.objects.get(id=city_id)
        except City.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        places = city.places.all()

        if not places:
            return Response(status=status.HTTP_404_NOT_FOUND)

        usps = []
        vital_infos = []
        for place in places:
            usps.extend(place.usps.distinct())
            vital_infos.extend(place.vital_infos.distinct())

    else:
        usps = PlaceUSP.objects.distinct()
        vital_infos = PlaceVitalInfo.objects.distinct()

    if usps:
        serialized_usps = [PlaceUSPSerializer(usp).data for usp in usps]
        filters_response_data['usps'].append(serialized_usps)

    if vital_infos:
        serialized_vital_infos = [PlaceVitalInfoSerializer(vital_info).data for vital_info in vital_infos]
        filters_response_data['vital_infos'].append(serialized_vital_infos)

    return Response(filters_response_data)
