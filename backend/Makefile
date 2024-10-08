build:
	docker-compose build
buildch:
	docker-compose build --no-cache
up:
	docker-compose up
superuser:
	docker-compose run --rm django python manage.py createsuperuser
migrate:
	docker-compose run --rm django python manage.py makemigrations
	docker-compose run --rm django python manage.py migrate
app:
	docker-compose run --rm django python manage.py startapp $(name)
statics:
	docker-compose run --rm django python manage.py collectstatic --no-input