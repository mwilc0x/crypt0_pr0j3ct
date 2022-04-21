docker-compose stop -t 1 ssr-app
docker-compose build ssr-app
docker-compose up --no-start ssr-app
docker-compose start ssr-app