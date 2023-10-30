const AwaitList = require ('../models/awaitList');
const Member = require ('../models/member');
const Movie = require ('../models/movie');

async function create(req, res,next){
    const memberId = req.body.memberId;
    const movieId = req.body.movieId;

    let member = await Member.findOne({"_id":memberId});
    let movie = await Movie.findOne({"_id":movieId});
    let awaitList = new AwaitList({
        member: member,
        movie: movie
    });

    awaitList.save().then(obj => res.status(200).json({
        msg:"Miembro almacenado en la lista de espera correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"Error al almacenar el miembro en la lista de espera",
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    AwaitList.paginate({},options).then(objs => res.status(200).json({
        msg: 'Lista de espera',
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: 'No se pudo enlistar la lista de espera',
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    AwaitList.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Reservación con id: ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo enlistar la reservación: ${id}`,
        obj: ex
    }));
}

function replace(req, res,next){
    const id = req.params.id;
    let memberId = req.body.memberId ? req.body.memberId : "";
    let movieId = req.body.movieId ? req.body.movieId : "";
    
    let awaitList = new Object({
        _memberId: memberId,
        _movieId: movieId
    });

    AwaitList.findOneAndUpdate({"_id":id}, awaitList, {new: true}).then(obj => res.status(200).json({
        msg: `Reservación con id ${id} reemplazada correctamente`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo reemplazar la reservación con id: ${id}`,
        obj: ex
    }));
}

function update(req, res,next){
    const id = req.params.id;
    const memberId = req.body.memberId;
    const movieId = req.body.movieId;

    const awaitList = new Object();
    if(memberId) awaitList._memberId = memberId;
    if(movieId) awaitList._movieId = movieId;

    AwaitList.findOneAndUpdate({"_id":id}, awaitList).then(obj => res.status(200).json({
        msg: 'Reservación actualizada correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo actualizar user con id: ${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    AwaitList.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: `Reservación con id ${id} eliminada`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar la reservación: ${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};