const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _description: String,
    _status: Boolean
});

class Genre{
    constructor(description,status){
        this._description = description,
        this._status = status
    }

    get description(){
        return this._description;
    }

    set description(v){
        this._status = v;
    }

    get status(){
        return this._status;
    }

    set status(v){
        this._status = v;
    }
}

schema.loadClass(Genre);

module.exports = mongoose.model('Genres',schema);