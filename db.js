const Sequelize = require ('sequelize');

const directorModel = require('./models/director');
const actorModel = require('./models/actor');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const copyModel = require('./models/copy');

/*
    1.- Nombre de la base de datos
    2.- Usuario
    3.- Contraseña
    4.- Objeto de configuración ORM
*/

const sequelize = new Sequelize('video-club', 'root', 'abcd1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);

//Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as:'movies'});
//Una pelicula tiene un genero
Movie.belongsTo(Genre, {as:'genre'});

//Un director  puede tener muchas peliculas
Director.hasMany(Movie, {as:'movies'})
//Una pelicula tiene un director
Movie.belongsTo(Director, {as: 'director'})

//Una pelicula puede tener muchas copias
Movie.hasMany(Copy, {as:'copies'});
//Una copia es de una pelicula
Copy.belongsTo(Movie, {as:'movie'})

//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey: 'movieId'})
//Una pelicula tiene muchos actores
MovieActor.belongsTo(Actor, {foreignKey: 'actorId'})

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movies_actors'
});

Actor.belongsToMany(Movie, {
    foreignKey: 'movieId',
    as: 'movies',
    through: 'movies_actors'
});

sequelize.sync({
    force: true
}).then(()=>{
    console.log('Base de datos sincornizada.')
});

module.exports = {Director, Actor, Genre, Movie, Member, Copy};