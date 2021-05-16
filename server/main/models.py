import uuid

from django.db import models


class City(models.Model):

    class Meta:
        db_table = 'server_cities'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)

    def __str__(self):
        return f'<City: {self.name}>'


class PlaceType(models.TextChoices):
    RESTAURANT = 'Restaurant'
    CAFE = 'Cafe'
    BAR = 'Bar'


class Place(models.Model):

    class Meta:
        db_table = 'server_places'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    website = models.CharField(max_length=200)
    place_type = models.CharField(max_length=10, choices=PlaceType.choices, default=PlaceType.RESTAURANT)
    address = models.TextField(blank=True)
    opening_times = models.TextField(blank=True)
    contact_info = models.TextField(blank=True)
    key_info = models.TextField(blank=True)
    speciality = models.TextField(blank=True)
    copy = models.TextField(blank=True)

    city = models.ForeignKey(City, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    # "Premature optimization is the root of all evil."

    # Address can be improved if needed:
    # https://pypi.org/project/django-address/
    # https://www.mjt.me.uk/posts/falsehoods-programmers-believe-about-addresses/

    # Opening times can be improved if needed:
    # https://stackoverflow.com/questions/28450106/business-opening-hours-in-django

    # key_info and speciality use yet to be fully defined

    def __str__(self):
        return f'<Place: {self.name} (Type: {self.place_type})>'


class PlaceImage(models.Model):

    class Meta:
        db_table = 'server_place_images'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uri = models.ImageField(upload_to='uploads/')

    place = models.ForeignKey(Place, related_name='place_images', on_delete=models.CASCADE)

    def __str__(self):
        return f'<Place Image: {self.uri} (Place: {self.place.name})>'


class Submission(models.Model):

    class Meta:
        db_table = 'server_submissions'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    submitter_name = models.CharField(max_length=150)
    place_website = models.CharField(max_length=200)
    reason_for_submission = models.TextField()

    date_submitted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'<Submission: {self.submitter_name}>'


# class Guestbook(models.model):
#
#     class Meta:
#         db_table = 'api_guestbooks'
