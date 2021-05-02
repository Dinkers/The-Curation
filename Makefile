.PHONY: install start database dotenv psqlshell

install:
	@-${MAKE} dotenv
	@docker-compose up --remove-orphans

start:
	@docker-compose up


database:
	@docker exec -it the-curator.server python manage.py migrate
	@#docker exec -it the-curator.server python manage.py loaddata main/migrations/seed/initial_data.json
	@echo
	@echo 'Create super user:'
	@docker exec -it the-curator.server python manage.py createsuperuser


dotenv:
	@printf "POSTGRES_DB=the_curator_db\n \
			 POSTGRES_USER=the_curator_user\n \
			 POSTGRES_PASSWORD=local_insecure_password\n \
			 POSTGRES_HOSTNAME=postgres\n \
			 POSTGRES_PORT=5432" \
    | tr -d "[:blank:]" \
    > .env


psqlshell:
	@docker exec -it the-curator.postgres psql the_curator_db the_curator_user
