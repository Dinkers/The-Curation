# Generated by Django 3.2 on 2021-05-02 16:56

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
                ('place_type', models.CharField(choices=[('restaurant', 'Restaurant'), ('cafe', 'Cafe'), ('bar', 'Bar')], default='restaurant', max_length=10)),
                ('address', models.TextField()),
                ('opening_times', models.TextField()),
                ('contact_info', models.TextField()),
                ('key_info', models.TextField()),
                ('speciality', models.TextField()),
                ('copy', models.TextField()),
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
            name='PlaceImage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('uri', models.CharField(max_length=200)),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.place')),
            ],
            options={
                'db_table': 'server_place_images',
            },
        ),
    ]
