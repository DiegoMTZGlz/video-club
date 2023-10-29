const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _title: String,
    _genre: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre'
    },
    _director: {
        type: mongoose.Schema.ObjectId,
        ref: 'Director'
    }
});

class Movie{
    constructor(genre, title, director){
        this._title = title;
        this._genre = genre;
        this._director = director;

    }

    get genre(){
        return this._genre;
    }

    set genre(v){
        this._genre = v;
    }    

    get title(){
        return this._title;
    }

    set title(v){
        this._title = v;
    }

    get director(){
        return this._director
    }

    set director(v){
        this._director = v;
    }
}

schema.loadClass(Movie);

module.exports = mongoose.model('Movies',schema);