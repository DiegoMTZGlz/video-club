const Genre = require('../models/genre');
const jwt = require('jsonwebtoken');

function create(req, res,next){
    
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'CREATE');
        if (Auth) {
            
            const description = req.body.description;
            const status = req.body.status;

            let genre = new Genre({
                description: description,
                status: status
            });

            genre.save().then(obj => res.status(200).json({
                msg: 'Genero creado correctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: 'No se pudo agregar el genero',
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para agregar géneros'});
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
            Genre.paginate({},options).then(objs => res.status(200).json({
                msg: 'Lista de generos',
                obj: objs
            })).catch(ex => res.status(500).json({
                msg: 'No se pudieron enlistar generos',
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver los géneros'});
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
            Genre.findOne({"_id":id}).then(obj => res.status(200).json({
                msg: `Genero con id ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo eliminar genero con id ${id}`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver el género'});
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
            const description = req.body.description ? req.body.description: "";
            const status = req.body.status ? req.body.status : "";

            let genre = new Object({
                _description: description,
                _status: status
            });

            Genre.findOneAndUpdate({"_id":id},genre, {new: true}).then(obj => res.status(200).json({
                msg: `Genero reemplazado exitosamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `Genero con id ${id} no se pudo reemplazar`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para reemplazar géneros'});
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
            const description = req.body.description;
            const status = req.body.status;

            let genre = new Object();
            if(description) genre._description = description;
            if(status) genre._status = status;

            Genre.findOneAndUpdate({"_id":id},genre).then(obj => res.status(200).json({
                msg: `Genero con id ${id} actualizado correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `Genero con id ${id} no se pudo actualizar`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar géneros'});
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
            Genre.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
                msg: `Genero con ${id} eliminado correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `Genero con id ${id} no se pudo eliminar`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar géneros'});
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
    
}

module.exports = {
    list, index, create, replace, update, destroy
};