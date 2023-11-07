const Director = require('../models/director');
const jwt = require('jsonwebtoken');

function create(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'CREATE');
        if (Auth) {
            const name = req.body.name;
            const lastName = req.body.lastName;
            
            let director = new Director({
                name: name,
                lastName: lastName
            });

            director.save().then(obj => res.status(200).json({
                msg: "Director creado correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: "No se pudo almacenar el director",
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para agregar directores' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function list(req,res,next){
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
            Director.paginate({},options).then(objs => res.status(200).json({
                msg: "Lista de directores",
                obj: objs
            })).catch(ex => res.status(500).json({
                msg: "No se pudo consultar la lista de directores",
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver los directores' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }

}

function index(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'READ');
        if (Auth) {
            const id = req.params.id;
            Director.findOne({"_id":id}).then(obj => res.status(200).json({
                msg: `Director con el id ${id}`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo consultar el director ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver el director' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function replace(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');
        if (Auth) {
            const id = req.params.id;
            let name = req.body.name ? req.body.name : "";
            let lastName = req.body.lastName ? req.body.lastName : "";
            let director = new Object({
                _name : name,
                _lastName: lastName
            })  

            Director.findOneAndUpdate({"_id":id}, director, {new: true}).then(obj => res.status(200).json({
                msg: "Director reemplazado correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo reemplazar el director ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para reemplazar los directores' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function update(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');
        if (Auth) {
            const id = req.params.id;
            let name = req.body.name;
            let lastName = req.body.lastName;
            
            let director = new Object();
            if (name) director._name = name;
            if (lastName) director._lastName = lastName;

            Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
                msg: "Director actualizado correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo reemplazar el director ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar los directores' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function destroy(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'DELETE');
        if (Auth) {
            const id = req.params.id;
            Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
                msg: "Director eliminado correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo eliminar el director ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar los directores' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

module.exports = {
    list, index, create, replace, update, destroy
};
