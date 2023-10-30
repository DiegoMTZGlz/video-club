const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _member: {
        type: mongoose.Schema.ObjectId,
        ref: 'Member'
    },
    _movie: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }
});

class AwaitList{
    constructor(member, movie){
        this._member = member;
        this._movie = movie;
    }

    get member(){
        return this._member;
    }

    set member(v){
        this._member = v;
    }

    get movie(){
        return this._movie;
    }

    set movie(v){
        this._movie = v;
    }
}

schema.loadClass(AwaitList);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('AwaitLists',schema);