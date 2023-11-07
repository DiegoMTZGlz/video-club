const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userPermissionSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    description: String,
    type: { type: String, enum: ['CREATE', 'READ', 'UPDATE', 'DELETE']}
});

const userSchema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _email: String,
    _password: String,
    _salt: String,
    _permissions: [userPermissionSchema]
});
class User {
    constructor(name, lastName, email, password, salt, permissions) {
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._salt = salt;
        this._permissions = permissions;
    }

    get name() {
        return this._name;
    }

    set name(v) {
        this._name = v;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(v) {
        this._lastName = v;
    }

    get email() {
        return this._email;
    }

    set email(v) {
        this._email = v;
    }

    get password() {
        return this._password;
    }

    set password(v) {
        this._password = v;
    }

    get salt() {
        return this._salt;
    }

    set salt(v) {
        this._salt = v;
    }

    get permissions() {
        return this._permissions;
    }

    set permissions(v) {
        this._permissions = v;
    }
}

userSchema.loadClass(User);
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Users', userSchema);