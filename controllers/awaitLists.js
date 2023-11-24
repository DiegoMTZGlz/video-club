const AwaitList = require ('../models/awaitList');
const Member = require ('../models/member');
const Movie = require ('../models/movie');

async function create(req, res,next){
    const memberId = req.body.memberId;
    const movieId = req.body.movieId;

    let member = await Member.findOne({"_id":memberId});
    let movie = await Movie.findOne({"_id":movieId});
    let awaitList = new AwaitList({
        member: member,
        movie: movie
    });

    awaitList.save().then(obj => res.status(200).json({
        msg: res.__('awaitLists.create.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('awaitLists.create.wrong'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    AwaitList.paginate({},options).then(objs => res.status(200).json({
        msg: res.__('awaitLists.list.ok'),
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('awaitLists.list.wrong'),
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    AwaitList.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('awaitLists.index.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('awaitLists.create.ok')`${id}`,
        obj: ex
    }));
}

async function replace(req, res,next){
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
        msg: res.__('awaitLists.replace.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('awaitLists.replace.wrong')+`${id}`,
        obj: ex
    }));
}

async function update(req, res,next){
    const id = req.params.id;
    const memberId = req.body.memberId;
    const movieId = req.body.movieId;
    let member = await Member.findOne({"_id":memberId});
    let movie = await Movie.findOne({"_id":movieId});

    const awaitList = new Object();
    if(memberId) awaitList._member = member;
    if(movieId) awaitList._movie = movie;

    AwaitList.findOneAndUpdate({"_id":id}, awaitList).then(obj => res.status(200).json({
        msg: res.__('awaitLists.update.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('awaitLists.update.wrong')+`${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    AwaitList.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('awaitLists.destroy.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('awaitLists.destroy.wrong')`${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};