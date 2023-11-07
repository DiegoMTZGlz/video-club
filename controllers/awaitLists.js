const AwaitList = require ('../models/awaitList');
const Member = require ('../models/member');
const Movie = require ('../models/movie');
const jwt = require('jsonwebtoken');

async function create(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'CREATE');
        if (Auth) {
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
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para crear listas de espera' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function list(req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'READ');
        if (Auth) {
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
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver las listas de espera' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }

}

function index(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'READ');
        if (Auth) {
            const id = req.params.id;
            AwaitList.findOne({"_id":id}).then(obj => res.status(200).json({
                msg: `Reservación con id: ${id}`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo enlistar la reservación: ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver la lista de espera' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

async function replace(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');
        if (Auth) {
            const id = req.params.id;
            let memberId = req.body.memberId ? req.body.memberId : "";
            let movieId = req.body.movieId ? req.body.movieId : "";
            let member = await Member.findOne({"_id":memberId});
            let movie = await Movie.findOne({"_id":movieId});
            
            let awaitList = new Object({
                _member: member,
                _movie: movie
            });

            AwaitList.findOneAndUpdate({"_id":id}, awaitList, {new: true}).then(obj => res.status(200).json({
                msg: `Reservación con id ${id} reemplazada correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo reemplazar la reservación con id: ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para reemplazar la lista de espera' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

async function update(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');
        if (Auth) {
            const id = req.params.id;
            const memberId = req.body.memberId;
            const movieId = req.body.movieId;
            let member = await Member.findOne({"_id":memberId});
            let movie = await Movie.findOne({"_id":movieId});

            const awaitList = new Object();
            if(memberId) awaitList._member = member;
            if(movieId) awaitList._movie = movie;

            AwaitList.findOneAndUpdate({"_id":id}, awaitList).then(obj => res.status(200).json({
                msg: 'Reservación actualizada correctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo actualizar user con id: ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar la lista de espera' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }

}

function destroy(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'DELETE');
        if (Auth) {
            const id = req.params.id;
            AwaitList.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
                msg: `Reservación con id ${id} eliminada`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo eliminar la reservación: ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar la lista de espera' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

module.exports = {
    list, index, create, replace, update, destroy
};