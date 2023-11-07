const Member = require('../models/member');
const jwt = require('jsonwebtoken');

function create(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'CREATE');
        if (Auth) {
            let name = req.body.name;
            let lastName = req.body.lastName;
            let phone = req.body.phone;
            
            let address = new Object();
            address.street = req.body.street;
            address.number = req.body.number;
            address.zip = req.body.zip;
            address.city = req.body.city;
            address.state = req.body.state;
            address.country = req.body.country

            let member = new Member({
                name: name,
                lastName: lastName,
                phone: phone,
                address: address
            });

            member.save().then(obj => res.status(200).json({
                msg: "Socio agreagado correctamente",
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: "No se pudo agregar el socio",
                obj: ex
            }));        
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para agregar socios'});
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
            Member.paginate({},options).then(objs => res.status(200).json({
                msg: 'Lista de socios',
                obj: objs
            })).catch(ex => res.status(500).json({
                msg: 'No se pudieron enlistar los socios',
                obj: ex
            }));        
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver los socios'});
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
            Member.findOne({"_id":id}).then(obj => res.status(200).json({
                msg: `Socio con id: ${id}`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo enlistar socio: ${id}`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para ver el socio'});
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function replace(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');
        if (Auth) {
            const id = req.params.id;
            const name = req.body.name ? req.body.name : "";
            const lastName = req.body.lastName ? req.body.lastName : "";
            const phone = req.body.phone ? req.body.phone : "";
            
            let address = new Object();
            address.street = req.body.street ? req.body.street : "";
            address.number = req.body.number ? req.body.number : "";
            address.zip = req.body.zip ? req.body.zip : "";
            address.city = req.body.city ? req.body.city : "";
            address.state = req.body.state ? req.body.state : "";
            address.country = req.body.country ? req.body.country : "";
            
            const member = new Object({
                _name: name,
                _lastName: lastName,
                _phone: phone,
                _address: address
            });

            Member.findOneAndUpdate({"_id":id}, member, {new: true}).then(obj => res.status(200).json({
                msg: `Socio con id: ${id} reemplazado correctamente`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo reemplazar socio con id: ${id}`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para reemplazar socios'});
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

function update(req, res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, '304db2483b8814fc7e60f5b2fb252749');
        const userPermissions = decoded.permissions;
        const Auth = userPermissions.some(permission => permission.type === 'UPDATE');
        if (Auth) {
            const id = req.params.id;
            const name = req.body.name;
            const lastName = req.body.lastName;
            const phone = req.body.phone;
            
            let address = new Object();
            address.street = req.body.street;
            address.number = req.body.number;
            address.zip = req.body.zip;
            address.city = req.body.city;
            address.state = req.body.state;
            address.country = req.body.country

            const member = new Object();
            if(name) member._name = name;
            if(lastName) member._lastName = lastName;
            if(phone) member._phone = phone;
            if(address) member._address = address;

            Member.findOneAndUpdate({"_id":id}, member).then(obj => res.status(200).json({
                msg: 'Socio actualizado corerctamente',
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo actualizar socio con id: ${id}`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar socios'});
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
            Member.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
                msg: `Socio con id ${id} eliminado`,
                obj: obj
            })).catch(ex => res.status(500).json({
                msg: `No se pudo eliminar socio ${id}`,
                obj: ex
            }));            
        } else {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar socios'});
        }
    }catch{
        return res.status(500).json({msg: "Error: Existe el token de autorización?"})
    }
}

module.exports = {
    list, index, create, replace, update, destroy
};