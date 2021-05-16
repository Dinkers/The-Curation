# The Curation

Web application to help distinguished users find good food.

## Design and Specification

#### Pages

* Home screen
* Place screen
* Submit screen (admin)
* Review screen (admin)

#### Models

* Cities
* Place
* Submission
* User
* Guestbook

## Installing and running the server

**Please ensure ports 8000 and 5432 are free before running any commands.**

Installing and running the server:

```bash
make install
```

Make the database (**while the server is running**):

```bash
make database
```

The server should now be accessible at [http://0.0.0.0:8000/](http://0.0.0.0:8000/). 

The admin panel can be accessed at [http://0.0.0.0:8000/admin](http://0.0.0.0:8000/admin).

### Development Tools

The [insomnia](https://insomnia.rest) project can be found at [docs/the_curation_insomnia_project.json](docs/the_curation_insomnia_project.json).

### Updating the database seed

https://docs.djangoproject.com/en/3.1/howto/initial-data/

#### Option 1 - manual initial_data.json file update:

1. Update the [json file](server/main/migrations/seed/initial_data.json)

   (uuid creation if you need it):

   ```python
   import uuid
   uuid.uuid4()
   # UUID('a9800c55-93a2-4bd3-9ee6-7c83a9b13ae4')
   ```

2. Delete the db

   ```bash
   rm -rf postgres-data/postgres/*
   ```

3. Recreate db

   ```bash
   make database
   ```

#### Option 2 - update models and generate inital data json:

```python
from main.models import Voice, Channel
voice = Voice(name='BBC', homepage_url='https://www.bbc.co.uk')
voice.save()
channel = Channel(title='BBC - UK', source_url='https://www.bbc.co.uk', url_to_scrape='http://feeds.bbci.co.uk/news/rss.xml', channel_type='O', voice=voice)
channel.save()
```

```bash
docker exec -it curator.server python manage.py dumpdata main | python -m json.tool > initial_data.json
```

https://docs.djangoproject.com/en/3.1/ref/django-admin/#django-admin-dumpdata

