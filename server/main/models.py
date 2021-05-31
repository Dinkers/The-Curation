import uuid

from django.db import models
from django.core.validators import RegexValidator


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
    email_address = models.EmailField(blank=True)
    copy = models.TextField(blank=True)
    
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: "
                                                                   "'+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)

    city = models.ForeignKey(City, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    # Address can be improved if needed:
    # https://pypi.org/project/django-address/
    # https://www.mjt.me.uk/posts/falsehoods-programmers-believe-about-addresses/

    def __str__(self):
        return f'<Place: {self.name} (Type: {self.place_type})>'


class PlaceOpeningHours(models.Model):

    WEEKDAYS = [
        (1, 'Monday'),
        (2, 'Tuesday'),
        (3, 'Wednesday'),
        (4, 'Thursday'),
        (5, 'Friday'),
        (6, 'Saturday'),
        (7, 'Sunday')
    ]

    class Meta:
        db_table = 'server_place_opening_hours'
        ordering = ('weekday', 'from_hour')
        unique_together = ('weekday', 'from_hour', 'to_hour')

    weekday = models.IntegerField(choices=WEEKDAYS)
    from_hour = models.TimeField()
    from_hour = models.TimeField()

    place = models.ForeignKey(Place, related_name='place_images', on_delete=models.CASCADE)

    def __str__(self):
        return f'<Place Opening Hours: {self.weekday} {self.from_hour}:{self.from_hour} (Place: {self.place.name})>'


class PlaceUSP(models.Model):

    class Meta:
        db_table = 'server_place_usps'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usp = models.CharField(max_length=200)

    place = models.ForeignKey(Place, related_name='place_images', on_delete=models.CASCADE)

    def __str__(self):
        return f'<Place USP: {self.usp} (Place: {self.place.name})>'


class PlaceVitalInfo(models.Model):

    class Meta:
        db_table = 'server_place_vital_infos'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vital_info = models.CharField(max_length=200)

    place = models.ForeignKey(Place, related_name='place_images', on_delete=models.CASCADE)

    def __str__(self):
        return f'<Place VitalInfo: {self.vital_info} (Place: {self.place.name})>'


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
