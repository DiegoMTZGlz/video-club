const Movie = require ('../models/movie');
const Genre = require ('../models/genre');
const Director = require ('../models/director');
const jwt = require('jsonwebtoken');

async function create(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'CREATE');
        if (Auth) {
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
        } else {
            return res.status(403).json({ msg:'No tienes permiso para agregar películas' });
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
            Movie.paginate({},options).then(objs => res.status(200).json({
                msg: 'Lista de peliculas',
                obj: objs
            })).catch(ex => res.status(500).json({
                msg: 'No se pudieron enlistar las peliculas',
                obj: ex
            }));    
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver las películas'});
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
            User.findOne({"_id":id}).then(obj => res.status(200).json({
                msg: `User con id ${id}`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo enlistar user ${id}`,
                obj: ex
            }));        
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver la película'});
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
            const title = req.body.title ? req.body.title : "";
            const genreId = req.body.genreId ? req.body.genreId : "";
            const directorId = req.body.directorId ? req.body.directorId : "";
            let genre = await Genre.findOne({"_id":genreId});
            let director = await Director.findOne({"_id":directorId});    

            let movie = new Object({
                    _title: title,
                    _genre: genre,
                    _director: director
            });

            Movie.findOneAndUpdate({"_id":id}, movie, {new: true}).then(obj => res.status(200).json({
                msg: `Película con id: ${id} reemplazado correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo reemplazar película con id: ${id}`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para reemplazar películas'});
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
            const title = req.body.title;
            const genreId = req.body.genreId;
            const directorId = req.body.directorId;
            let genre = await Genre.findOne({"_id":genreId});
            let director = await Director.findOne({"_id":directorId});  

            const movie = new Object();
            if(title) movie._title = title;
            if(genreId) movie._genre = genre;
            if(directorId) movie._director = director;

            Movie.findOneAndUpdate({"_id":id}, movie).then(obj => res.status(200).json({
                msg: 'Película actualizada corerctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo actualizar la película con id ${id}`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar las películas' });
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
            Movie.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
                msg: `Película con id ${id} eliminada`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo eliminar la película: ${id}`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar películas' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

module.exports = {
    list, index, create, replace, update, destroy
};