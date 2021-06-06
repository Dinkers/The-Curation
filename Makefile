.PHONY: install start database dotenv servershell psqlshell

install:
	@-${MAKE} dotenv
	@rm -rf postgres-data/postgres/*
	@mkdir -p postgres-data/postgres/
	@docker compose up --remove-orphans

start:
	@docker compose up


database:
	@echo 'Migrating models'
	@docker exec -it curation.server python manage.py migrate
	@echo 'Seeding data'
	@docker exec -it curation.server python manage.py loaddata main/migrations/seed/initial_data.json
	@echo
	@echo 'Create super user:'
	@docker exec -it curation.server python manage.py createsuperuser


dotenv:
	@printf "POSTGRES_DB=the_curation_db\n \
			 POSTGRES_USER=the_curation_user\n \
			 POSTGRES_PASSWORD=local_insecure_password\n \
			 POSTGRES_HOSTNAME=postgres\n \
			 POSTGRES_PORT=5432" \
    | tr -d "[:blank:]" \
    > .env


servershell:
	@docker exec -it curation.server bash


psqlshell:
	@docker exec -it curation.postgres psql the_curation_db the_curation_user
