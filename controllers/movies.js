const Movie = require ('../models/movie');
const Genre = require ('../models/genre');
const Director = require ('../models/director');

async function create(req, res,next){
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    let genre = await Genre.findOne({"_id":genreId});
    let director = await Director.findOne({"_id":directorId});
    let movie = new Movie({
            title: title,
            genre: genre,
            director: director
    });

    movie.save().then(obj => res.status(200).json({
        msg:"Pelicula almacenada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"Error al almacenar la pelicula",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    Movie.paginate({},options).then(objs => res.status(200).json({
        msg: 'Lista de peliculas',
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: 'No se pudieron enlistar las peliculas',
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `User con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo enlistar user ${id}`,
        obj: ex
    }));
}

function replace(req, res,next){
    const id = req.params.id;
    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";
    const email = req.body.email ? req.body.email : "";
    const password = req.body.password ? req.body.password : "";
    
    const user = new Object({
        _name: name,
        _lastName: lastName,
        _email: email,
        _password: password
    });

    User.findOneAndUpdate({"_id":id}, user, {new: true}).then(obj => res.status(200).json({
        msg: `User con id ${id} reemplazado correctamente`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo reemplazar user con id ${id}`,
        obj: ex
    }));
}

function update(req, res,next){
    const id = req.params.id;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const user = new Object();
    if(name) user._name = name;
    if(lastName) user._lastName = lastName;
    if(email) user._email = email;
    if(password) user._password = password;

    User.findOneAndUpdate({"_id":id}, user).then(obj => res.status(200).json({
        msg: 'User actualizado corerctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo actualizar user con id ${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    Movie.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: `Película con id ${id} eliminada`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar la película: ${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};