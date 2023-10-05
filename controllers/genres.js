const express = require('express');
const { Genre } = require('../db');

function create(req,res,next){
    const description = req.body.description;
    const status = req.body.status;

    Genre.create({
        description: description,
        status: status
    }).then(object => res.json(object)).catch(error => res.send(error));
}

function list(req,res,next){
    Genre.findAll().then(objects => res.json(objects)).catch(error => res.send(error));
}

function index(req,res,next){
    const id = req.params.id;
    Genre.findByPk(id).then(object => res.json(object)).catch(error => res.send(error));
}

function replace(req,res,next){Genre
    const id = req.params.id;
    Genre.findByPk(id).then(object =>{
        const description = req.body.description ? req.body.description : "";
        const status = req.body.status ? req.body.status : "";
        object.update({
            description: description,
            status:status
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function update(req,res,next){
    const id = req.params.id;
    Genre.findByPk(id).then(object =>{
        const description = req.body.description ? req.body.description : object.description;
        const status = req.body.status ? req.body.status : object.status;
        object.update({
            description: description,
            status: status
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function destroy(req,res,next){
    const id = req.params.id;
    Genre.destroy({where : {id: id}}).then(object => res.json(object)).catch(error => res.send(error));
}

module.exports = {
    list, index, create, replace, update, destroy
};