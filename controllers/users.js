const User = require ('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function create(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'CREATE');
        if (Auth) {
            let name = req.body.name;
            let lastName = req.body.lastName;
            let email = req.body.email;
            let password = req.body.password;
            let salt = await bcrypt.genSalt(10);
            let permissions = [];
            for (let i = 0; req.body[`permissions[${i}][type]`]; i++) {
                let permission = {
                    description: req.body[`permissions[${i}][description]`],
                    type: req.body[`permissions[${i}][type]`]
                };
                permissions.push(permission);
            }
            
            const passwordHash = await bcrypt.hash(password, salt);

            let user = new User({
                name: name,
                lastName: lastName,
                email: email,
                password: passwordHash,
                salt: salt,
                permissions: permissions
            });

            console.log('Request body:', req.body);
            user.save().then(obj => res.status(200).json({
                msg: 'Usuario creado correctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                msg:'Error al crear usuario',
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para agregar usuarios' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function list(req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'READ');

        if (Auth) {
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
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver los usuarios' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function index(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'READ');

        if (Auth) {
            const id = req.params.id;
            User.findOne({"_id":id}).then(obj => res.status(200).json({
                msg: `Ususario con id ${id}`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo enlistar usuario: ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver usuarios' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

async function replace(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');

        if (Auth) {
            const id = req.params.id;
            const name = req.body.name ? req.body.name : "";
            const lastName = req.body.lastName ? req.body.lastName : "";
            const email = req.body.email ? req.body.email : "";
            const password = req.body.password ? req.body.password : "";
            let salt = await bcrypt.genSalt(10);
            let permissions = [];
            for (let i = 0; req.body[`permissions[${i}][type]`]; i++) {
                let permission = {
                    description: req.body[`permissions[${i}][description]`],
                    type: req.body[`permissions[${i}][type]`]
                };
                permissions.push(permission);
            }
        
            const passwordHash = await bcrypt.hash(password, salt);
            
            const user = new Object({
                _name: name,
                _lastName: lastName,
                _email: email,
                _password: passwordHash,
                _permissions: permissions
            });
        
            User.findOneAndUpdate({"_id":id}, user, {new: true}).then(obj => res.status(200).json({
                msg: `Usuario con id: ${id} reemplazado correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo reemplazar usuario con id: ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para reemplazar usuarios' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

async function update(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');

        if (Auth) {
            const id = req.params.id;
            const name = req.body.name;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const password = req.body.password;
            let salt = await bcrypt.genSalt(10);
            let permissions = [];
            for (let i = 0; req.body[`permissions[${i}][type]`]; i++) {
                let permission = {
                    description: req.body[`permissions[${i}][description]`],
                    type: req.body[`permissions[${i}][type]`]
                };
                permissions.push(permission);
            }
            const passwordHash = await bcrypt.hash(password, salt);
        
            const user = new Object();
            if(name) user._name = name;
            if(lastName) user._lastName = lastName;
            if(email) user._email = email;
            if(password) user._password = passwordHash;
            user._permissions = permissions;
        
            User.findOneAndUpdate({"_id":id}, user).then(obj => res.status(200).json({
                msg: 'Usuario actualizado corerctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo actualizar usuario con id ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar usuarios' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function destroy(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'DELETE');

        if (Auth) {
            const id = req.params.id;
            User.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
                msg: `Usuario con id ${id} eliminado`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo eliminar usuario ${id}`,
                obj: ex
            }));
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar usuarios' });
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

module.exports = {
    list, index, create, replace, update, destroy
};