const User = require ('../models/user');
const bcrypt = require('bcrypt');

async function create(req, res,next){
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    let user = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: passwordHash,
        salt: salt
    });

    user.save().then(obj => res.status(200).json({
        msg: 'Usuario creado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:'Error al crear usuario',
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    User.paginate({},options).then(objs => res.status(200).json({
        msg: 'Lista de usuarios',
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: 'No se pudieron enlistar los usuarios',
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Ususario con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo enlistar usuario: ${id}`,
        obj: ex
    }));
}

async function replace(req, res,next){
    const id = req.params.id;
    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";
    const email = req.body.email ? req.body.email : "";
    const password = req.body.password ? req.body.password : "";
    let salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);
    
    const user = new Object({
        _name: name,
        _lastName: lastName,
        _email: email,
        _password: passwordHash
    });

    User.findOneAndUpdate({"_id":id}, user, {new: true}).then(obj => res.status(200).json({
        msg: `Usuario con id: ${id} reemplazado correctamente`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo reemplazar usuario con id: ${id}`,
        obj: ex
    }));
}

async function update(req, res,next){
    const id = req.params.id;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    let salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    const user = new Object();
    if(name) user._name = name;
    if(lastName) user._lastName = lastName;
    if(email) user._email = email;
    if(password) user._password = passwordHash;

    User.findOneAndUpdate({"_id":id}, user).then(obj => res.status(200).json({
        msg: 'Usuario actualizado corerctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo actualizar usuario con id ${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    User.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: `Usuario con id ${id} eliminado`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar usuario ${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};