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
        msg: res.__('copies.create.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copies.create.wrong'),
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
        msg: res.__('copies.list.ok'),
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('copies.list.wrong'),
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    Copy.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('copies.index.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copies.index.wrong')+`${id}`,
        obj: ex
    }));
}

async function replace(req, res,next){
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
        msg: res.__('copies.replace.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copies.replace.wrong')+`${id}`,
        obj: ex
    }));
}

async function update(req, res,next){
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
        msg: res.__('copies.update.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copies.update.wrong')+`${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    Copy.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('copies.destroy.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copies.destroy.wrong')+`${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};