FROM node:14

WORKDIR /src

COPY . /src

RUN npm install

EXPOSE 1234

CMD npm run start