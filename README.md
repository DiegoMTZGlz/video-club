# Video Club - Práctica

Práctica del proyecto de ejemplo video-club

### Pre-requisítos

node-js

mysql (v5.7 recomendada)

### Ejecución

Primero ejecutaremos el contenedor con mysql de la siguiente manera (los parametros pueden variar en función de la configuración de la base de datos):
```
docker run -p 3306:3306 -p 33060:33060 --name=video-club -e MYSQL_ROOT_PASSWORD=abcd1234 -d mysql:5.7
```

Usar:

```
npm start
```

Ahora ejecutaremos nuestras rutas, en este caso usaremos la siguiente colección de [-> rutas para postman <-](https://documenter.getpostman.com/view/29152984/2s9YR83YBS)

## Hecho con

  - [Node-js](https://nodejs.org/es)
  - [MySQL](https://www.mysql.com/)

## Autor

  - *Diego Martínez* -
    [DiegoMTZGlez](https://github.com/DiegoMTZGlz)