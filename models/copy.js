const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _number: Number,
    _format: String,
    _movie: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    },
    _status: Boolean

});

class Copy{
    constructor(number, format, movie, status){
        this._number = number;
        this._format = format;
        this._movie = movie;
        this._status = status;

    }

    get number(){
        return this._number;
    }

    set number(v){
        this._number = v;
    }    

    get format(){
        return this._format;
    }

    set format(v){
        this._format = v;
    }

    get movie(){
        return this._movie;
    }

    set movie(v){
        this._movie = v;
    }

    get status(){
        return this._status;
    }

    set status(v){
        this._status = v;
    }
}

schema.loadClass(Copy);

module.exports = mongoose.model('Copies',schema);