# Generated by Django 3.2 on 2021-06-04 08:47

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'server_cities',
            },
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150)),
                ('website', models.CharField(max_length=200)),
                ('place_type', models.CharField(choices=[('Restaurant', 'Restaurant'), ('Cafe', 'Cafe'), ('Bar', 'Bar')], default='Restaurant', max_length=10)),
                ('address', models.TextField(blank=True)),
                ('email_address', models.EmailField(blank=True, max_length=254)),
                ('copy', models.TextField(blank=True)),
                ('phone_number', models.CharField(blank=True, max_length=17, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.city')),
            ],
            options={
                'db_table': 'server_places',
            },
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('submitter_name', models.CharField(max_length=150)),
                ('place_website', models.CharField(max_length=200)),
                ('reason_for_submission', models.TextField()),
                ('date_submitted', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'server_submissions',
            },
        ),
        migrations.CreateModel(
            name='PlaceVitalInfo',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('vital_info', models.CharField(max_length=200)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vital_infos', to='main.place')),
            ],
            options={
                'db_table': 'server_place_vital_infos',
            },
        ),
        migrations.CreateModel(
            name='PlaceUSP',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('usp', models.CharField(max_length=200)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='usps', to='main.place')),
            ],
            options={
                'db_table': 'server_place_usps',
            },
        ),
        migrations.CreateModel(
            name='PlaceImage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('uri', models.ImageField(upload_to='uploads/')),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='main.place')),
            ],
            options={
                'db_table': 'server_place_images',
            },
        ),
        migrations.CreateModel(
            name='PlaceOpeningHours',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weekday', models.CharField(choices=[('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'), ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday'), ('Sunday', 'Sunday')], max_length=10)),
                ('from_hour', models.TimeField()),
                ('to_hour', models.TimeField()),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='opening_hours', to='main.place')),
            ],
            options={
                'db_table': 'server_place_opening_hours',
                'ordering': ('weekday', 'from_hour'),
                'unique_together': {('weekday', 'from_hour', 'to_hour')},
            },
        ),
    ]
