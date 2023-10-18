FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

ENV MYSQL_HOST=db
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=abcd1234
ENV MYSQL_DATABASE=video-club

CMD port=80 npm start