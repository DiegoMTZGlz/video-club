const Genre = require('../models/genre');

function create(req, res,next){
    const description = req.body.description;
    const status = req.body.status;

    let genre = new Genre({
        description: description,
        status: status
    });

    genre.save().then(obj => res.status(200).json({
        msg: res.__('genres.create.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genres.create.wrong'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    Genre.paginate({},options).then(objs => res.status(200).json({
        msg: res.__('genres.list.ok'),
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('genres.list.wrong'),
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    Genre.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('genres.index.ok')+`${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genres.index.wrong')+`${id}`,
        obj: ex
    }));
}

function replace(req, res,next){
    const id = req.params.id;
    const description = req.body.description ? req.body.description: "";
    const status = req.body.status ? req.body.status : "";

    let genre = new Object({
        _description: description,
        _status: status
    });

    Genre.findOneAndUpdate({"_id":id},genre, {new: true}).then(obj => res.status(200).json({
        msg: res.__('genres.replace.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genres.replace.wrong')+`${id}`,
        obj: ex
    }));
}

function update(req, res,next){
    const id = req.params.id;
    const description = req.body.description;
    const status = req.body.status;

    let genre = new Object();
    if(description) genre._description = description;
    if(status) genre._status = status;

    Genre.findOneAndUpdate({"_id":id},genre).then(obj => res.status(200).json({
        msg: res.__('genres.update.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genres.update.wrong')+`${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    Genre.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('genres.destroy.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genres.destroy.wrong')+`${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};