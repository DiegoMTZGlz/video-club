const Copy = require ('../models/copy');
const Movie = require ('../models/movie');

async function create(req, res,next){
    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;

    let movie = await Movie.findOne({"_id":movieId});
    let copy = new Copy({
            number: number,
            format: format,
            movie: movie,
            status: status
    });

    copy.save().then(obj => res.status(200).json({
        msg:"Copias almacenadas correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"Error al almacenar las copias",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    Copy.paginate({},options).then(objs => res.status(200).json({
        msg: 'Lista de copias',
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: 'No se pudieron enlistar las copias',
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    Copy.findOne({"_id":id}).then(obj => res.status(200).json({
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

    Copy.findOneAndUpdate({"_id":id}, user, {new: true}).then(obj => res.status(200).json({
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
        msg: 'User actualizado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo actualizar user con id ${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    Copy.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: `Copias con id ${id} eliminado`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar las copias: ${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};