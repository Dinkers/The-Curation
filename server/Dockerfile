FROM python:3.8

RUN apt-get update -y

RUN mkdir /server
COPY . /server

WORKDIR /server
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
