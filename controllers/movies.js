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
        msg: res.__('movies.create.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('movies.create.wrong'),
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
        msg: res.__('movies.list.ok'),
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('movies.list.wrong'),
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('movies.index.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('movies.index.wrong')+`${id}`,
        obj: ex
    }));
}

async function replace(req, res,next){
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
        msg: res.__('movies.replace.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('movies.replace.wrong')+`${id}`,
        obj: ex
    }));
}

async function update(req, res,next){
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
        msg: res.__('movies.update.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('movies.update.wrong')+`${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    Movie.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('movies.destroy.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('movies.destroy.wrong')+`${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};