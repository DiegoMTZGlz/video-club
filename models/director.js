const mongoose = require('mongoose');

// Schema: representa la coleccion que se encuentra en la db
const schema = mongoose.Schema({
    _name: String, // guion bajo para no teners problemas
    _lastName: String
});

// Clase: como lo vamos a mapear como objeto
class Director {
    constructor(name, lastName){
        this._name = name;
        this._lastName = lastName; 
    }

    get name(){
        return this._name;
    }

    set name(v){
        this._name = v;
    }

    get lastName(){
        return this._lastName;
    }

    set lastName(v){
        this._lastName = v;
    }

}


// mezcla el esquema con la clase que creamos
schema.loadClass(Director);

// exporta el model con nombre y schema
module.exports = mongoose.model('Director', schema);