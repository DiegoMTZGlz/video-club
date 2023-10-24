const Address = require('../models/address');

function create(req, res,next){
    const street = req.body.street;
    const number = req.body.number;
    const zip = req.body.zip;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;

    let address = new Address({
        street: street,
        number: number,
        zip: zip,
        city: city,
        state: state,
        country: country
    });

    address.save().then(obj => res.status(200).json({
        msg: 'Address creado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:'Error al crear address',
        obj: ex
    }));
}

function list(req, res, next) {
    Address.find().then(objs => res.status(200).json({
        msg: 'Lista de addresses',
        obj: objs
    })).catch(ex => res.status(500).json({
        msg: 'No se pudo enlistar addresses',
        obj: ex
    }));
}

function index(req, res,next){
    const id = req.params.id;
    Address.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Address con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo encontrar address con id ${id}`,
        obj: ex
    }));
}

function replace(req, res,next){
    const id = req.params.id;
    const street = req.body.street;
    const number = req.body.number;
    const zip = req.body.zip;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    
    const address = new Object({
        _street: street,
        _number: number,
        _zip: zip,
        _city: city,
        _state: state,
        _country: country
    });

    Address.findOneAndUpdate({"_id":id}, address, {new: true}).then(obj => res.status(200).json({
        msg: `Address con id ${id} reemplazado correctamente`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo reemplazar address con id ${id}`,
        obj: ex
    }));
}

function update(req, res,next){
    const id = req.params.id;
    const street = req.body.street;
    const number = req.body.number;
    const zip = req.body.zip;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;

    const address = new Object();
    if(street) address._street = street;
    if(number) address._number = number;
    if(zip) address._zip = zip;
    if(city) address._city = city;
    if(state) address._state = state;
    if(country) address._country = country;

    Address.findOneAndUpdate({"_id":id}, address).then(obj => res.status(200).json({
        msg: 'Address actualizado corerctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo actualizar address con id ${id}`,
        obj: ex
    }));

}

function destroy(req, res,next){
    const id = req.params.id;
    Address.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: `Address con ID ${id} eliminado correctamente`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar address con el id ${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};