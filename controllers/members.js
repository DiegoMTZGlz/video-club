const Member = require('../models/member');

function create(req, res,next){
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
        msg: res.__('members.create.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('members.create.wrong'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page? req.params.page :1;
    const options = {
        page: page,
        limit: 5
    };
    Member.paginate({},options).then(objs => res.status(200).json({
        msg: res.__('members.list.ok'),
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('members.list.wrong'),
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    Member.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('members.index.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('members.index.wrong')+`${id}`,
        obj: ex
    }));
}

function replace(req, res,next){
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
        msg: res.__('members.replace.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('members.replace.wrong')+`${id}`,
        obj: ex
    }));
}

function update(req, res,next){
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
        msg: res.__('members.update.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('members.update.wrong')+`${id}`,
        obj: ex
    }));
}

function destroy(req, res,next){
    const id = req.params.id;
    Member.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: res.__('members.destroy.ok')+`${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('members.destroy.wrong')+`${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};