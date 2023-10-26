const mongoose = require('mongoose');
const { scheduler } = require('timers/promises');

const schema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _phone: String,
    _address: {
        _street: String,
        _number: String,
        _zip: Number,
        _city: String,
        _state: String,
        _country: String
    }
});

class Member {
    constructor(name, lastName, phone, address){
        this._name = name;
        this._lastName = lastName;
        this._phone = phone;
        this._address = address;
    }

    get name(){
        return this._name;
    }

    set name(v){
        return this._name = v;
    }
    get lastName(){
        return this._lastName;
    }

    set lastName(v){
        return this._lastName = v;
    }
    get phone(){
        return this._phone;
    }

    set phone(v){
        return this._phone = v;
    }
    get address(){
        return this._address;
    }
    set address(v){
        return this._address = v;
    }
}

schema.loadClass(Member);
module.exports = mongoose.model('Members',schema);