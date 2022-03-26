FROM node:14-alpine
WORKDIR /usr/src/app
ADD . /
RUN chmod +x ./start.sh
CMD ["./start.sh"]