const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _street: String,
    _number: String,
    _zip: String,
    _city: String,
    _state: String,
    _country: String
});

class Address{
    constructor(street, number, zip, city, state, country){
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this._state = state;
        this._country = country;
    }

    get street(){
        return this._street;
    }
    
    set street(v){
        this._street = v;
    }
    
    get number(){
        return this._number
    }
    
    set number(v){
        this._number = v;
    }
    
    get zip(){
        return this._zip;
    }
    
    set zip(v){
        this._zip = v;
    }
    
    get city(){
        return this._city;
    }
    
    set city(v){
        this._city = v;
    }
    
    get state(){
        return this._state;
    }

    set state(v){
        this._state = v;
    }
    
    get country(){
        return this._country;
    }
    
    set country(v){
        this._country = v;
    }
    
}

schema.loadClass(Address);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Addresses', schema);