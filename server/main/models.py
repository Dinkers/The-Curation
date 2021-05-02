from django.db import models
from django.contrib.postgres.fields import ArrayField


class Place(models.model):

    class Meta:
        db_table = 'server_places'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    website = models.CharField(max_length=200)
    place_type = models.CharField(max_length=3, choices=PlaceType.choices, default=PlaceType.RESTAURANT)
    address = models.TextField()
    opening_times = models.TextField()
    contact_info = models.TextField()
    copy = models.TextField()

    city = models.ForeignKey(City, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    # "Premature optimization is the root of all evil."
    # Address can be improved if needed:
    # https://pypi.org/project/django-address/
    # https://www.mjt.me.uk/posts/falsehoods-programmers-believe-about-addresses/

    # Opening times can be improved if needed
    # https://stackoverflow.com/questions/28450106/business-opening-hours-in-django


class PlaceImage(models.model):

    class Meta:
        db_table = 'server_cities'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uri = models.CharField(max_length=200)

    place = models.ForeignKey(Place, on_delete=models.CASCADE)


class PlaceType(models.TextChoices):
    RESTAURANT = 'restaurant'
    CAFE = 'cafe'
    BAR = 'bar'


class City(models.model):

    class Meta:
        db_table = 'server_cities'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)


class Submission(models.model):

    class Meta:
        db_table = 'server_submissions'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    submitter_name = models.CharField(max_length=150)
    place_website = models.CharField(max_length=200)
    reason_for_submission = models.TextField()

    date_submitted = models.DateTimeField(auto_now_add=True)


# class Guesbook(models.model):
#
#     class Meta:
#         db_table = 'api_guestbooks'