const Copy = require ('../models/copy');
const Movie = require ('../models/movie');
const jwt = require('jsonwebtoken');

async function create(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'CREATE');
        if (Auth) {
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
                msg:"Copia(s) almacenada(s) correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                msg:"Error al almacenar la/las copia(s)",
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para agregar copias' });
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
            Copy.paginate({},options).then(objs => res.status(200).json({
                msg: 'Lista de copias',
                obj: objs
            })).catch(ex => res.status(500).json({
                msg: 'No se pudo/pudieron enlistar la/las copia(s)',
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver las copias' });
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
            Copy.findOne({"_id":id}).then(obj => res.status(200).json({
                msg: `Copia(s) con id: ${id}`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo/pudieron enlistar la/las copia(s) ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver copias' });
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
            const number = req.body.number ? req.body.number : "";
            const format = req.body.format ? req.body.format : "";
            const movieId = req.body.movieId ? req.body.movieId : "";
            const status = req.body.status ? req.body.status : "";

            let movie = await Movie.findOne({"_id":movieId});
            const copy = new Object({
                _number: number,
                _format: format,
                _movie: movie,
                _status: status
            });

            Copy.findOneAndUpdate({"_id":id}, copy, {new: true}).then(obj => res.status(200).json({
                msg: `Copia(s) con id: ${id} reemplazada(s) correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudieron reemplazar user con id ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para reemplazar copias' });
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
            const number = req.body.number;
            const format = req.body.format;
            const movieId = req.body.movieId;
            const status = req.body.status;

            let movie = await Movie.findOne({"_id":movieId});
            const copy = new Object();
            if(number) copy._number = number;
            if(format) copy._format = format;
            if(movieId) copy._movie = movie;
            if(status) copy._status = status;

            Copy.findOneAndUpdate({"_id":id}, copy).then(obj => res.status(200).json({
                msg: 'Copia(s) actualizada(s) correctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo/puediron actualizar la/las copia(s) con id: ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar copias' });
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
            Copy.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
                msg: `Copia(s) con id: ${id} eliminada(s)`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo/pudieron eliminar la/las copia(s): ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar copias' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

module.exports = {
    list, index, create, replace, update, destroy
};