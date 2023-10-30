const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    __name: String,
    _lastName: String,
    _email: String,
    _password: String
});

class User{
    constructor(name, lastName, email, password){
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
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
    
    get email(){
        return this._email;
    }
    
    set email(v){
        this._email = v;
    }
    
    get password(){
        return this._password;
    }
    
    set password(v){
        this._password = v;
    }

}

schema.loadClass(User);
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Users',schema);