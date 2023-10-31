FROM node:alpine
WORKDIR /app
COPY . .
ENV MONGODB_URI='mongodb://mongo:bAef1111a24GH16c1b6bebE2cad5H61A@roundhouse.proxy.rlwy.net:43592'
RUN npm install
EXPOSE 3000
CMD PORT=3000 npm start