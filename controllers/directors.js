const express = require('express');
const Director = require('../models/director');
const { UUID } = require('bson');

function create(req,res,next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Director({
        name: name, lastName: lastName
    });

    director.save().then(obj => res.status(200).json({
        msg: "Director creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar el Director",
        obj: ex
    }));
}

function list(req,res,next){
    Director.find().then(objs => res.status(300).json({
        msg: "Lista de Directores",
        obj: objs
    })).catch(ex => res.status(500).json({
        msg:"No se pudo obtenener la lista de directores",
        obj: ex
    }));
}

function index(req,res,next){
    const id = req.params.id;
    Director.findOne({"_id": id}).then(obj => res.status(200).json({
        msg: `Director con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"No se pudo obtenener el director",
        obj: ex
    }));
}

function replace(req,res,next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let director = new Object({
        _name: name,
        _lastName: lastName
    });

    Director.findOneAndUpdate({"_id": id}, director, {new: true}).then(obj => res.status(200).json({
        msg: `Director: ${id} reemplazado correctamente`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo reemplazar el director ${id}`,
        obj: ex
    }));
}

function update(req,res,next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let director = new Object();
    if(name) director._name=name;
    if(lastName) director._lastName=lastName;
    
    Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
        msg: `Director ${id} actualizado correctamente`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo actualizar el director ${id}`,
        obj: ex
    }))
}

function destroy(req,res,next){
    const id = req.params.id;
    Director.findByIdAndRemove({"_id": id}).then(obj => res.status(200).json({
        msg: "Director eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar el director ${id}`,
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};