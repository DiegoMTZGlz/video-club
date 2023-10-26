const Movie = require ('../models/movie');
const Director = require ('../models/director');
async function create(req, res,next){
    const title = req.body.params;
    const directorId = req.body.directorId;

    let director = await Director.findOne({"_id":directorId});
    let movie = new Movie({
            title: title,
            director: director
    });

    movie.save().then(obj => res.status(200).json({
        msg:"Director almacenado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"Error al almacenar el Director",
        obj: ex
    }));
}

function list(req, res, next) {
    Movie.find().populate("_director").then(objs => res.status(200).json({
        msg: 'Lista de peliculas',
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: 'No se pudieron enlistas las peliculas',
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
    User.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: `User con id ${id} eliminado`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar user ${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};