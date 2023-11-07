const Actor = require('../models/actor');
const jwt = require('jsonwebtoken');

function create(req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'CREATE');
        if (Auth) {
            const name = req.body.name;
            const lastName = req.body.lastName;

            let actor = new Actor({
                name: name,
                lastName: lastName
            });

            actor.save().then(obj => res.status(200).json({
                    msg: 'Actor creado correctamente',
                    obj: obj
            })).catch(ex => res.status(500).json({
                    msg: 'Error al crear actor',
                    obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para agregar actores' });
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
            Actor.paginate({},options).then(objs => res.status(200).json({
                msg: 'Lista de actores',
                obj: objs
            })).catch(ex => res.status(500).json({
                msg: 'No se pudo enlistar actores',
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver los actores' });
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
            Actor.findOne({"_id":id}).then(obj => res.status(200).json({
                msg: `Director con id ${id}`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo encontrar actor con id ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver el actor' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function replace(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');
        if (Auth) {
            const id = req.params.id;
            const name = req.body.name ? req.body.name : "";
            const lastName = req.body.lastName ? req.body.lastName : "";
            
            const actor = new Object({
                _name: name,
                _lastName: lastName
            });

            Actor.findOneAndUpdate({"_id":id}, actor, {new: true}).then(obj => res.status(200).json({
                msg: `Actor con id ${id} reemplazado correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo reemplazar actor con id ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para reemplazar los actores' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function update(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');
        if (Auth) {
            const id = req.params.id;
            const name = req.body.name;
            const lastName = req.body.lastName;

            const actor = new Object();
            if(name) actor._name = name;
            if(lastName) actor._lastName = lastName;

            Actor.findOneAndUpdate({"_id":id}, actor).then(obj => res.status(200).json({
                msg: 'Actor actualizado corerctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo actualizar actor con id ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar los actores' });
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
            Actor.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
                msg: `Actor con ID ${id} eliminado correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se puedo eliminar el id ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar los actores' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

module.exports = {
    list, index, create, replace, update, destroy
};