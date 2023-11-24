const Actor = require('../models/actor');

function create(req, res,next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name: name,
        lastName: lastName
    });

    actor.save().then(obj => res.status(200).json({
        msg: res.__('actors.create.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actors.create.wrong'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    Actor.paginate({},options).then(objs => res.status(200).json({
        msg: res.__('actors.list.ok'),
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('actors.list.wrong'),
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('actors.index.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actors.index.wrong')+`${id}`,
        obj: ex
    }));
}

function replace(req, res,next){
    const id = req.params.id;
    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";
    
    const actor = new Object({
        _name: name,
        _lastName: lastName
    });

    Actor.findOneAndUpdate({"_id":id}, actor, {new: true}).then(obj => res.status(200).json({
        msg: res.__('actors.replace.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actors.replace.wrong')+`${id}`,
        obj: ex
    }));
}

function update(req, res,next){
    const id = req.params.id;
    const name = req.body.name;
    const lastName = req.body.lastName;

    const actor = new Object();
    if(name) actor._name = name;
    if(lastName) actor._lastName = lastName;

    Actor.findOneAndUpdate({"_id":id}, actor).then(obj => res.status(200).json({
        msg: res.__('actors.update.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actors.update.wrong')+`${id}`,
        obj: ex
    }));

}

function destroy(req, res,next){
    const id = req.params.id;
    Actor.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('actors.destroy.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actors.destroy.wrong')+`${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};