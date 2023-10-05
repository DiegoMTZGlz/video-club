const express = require('express');
const { Actor } = require('../db');

function create(req,res,next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    Actor.create({
        name: name,
        lastName: lastName
    }).then(object => res.json(object)).catch(error => res.send(error));
}

function list(req,res,next){
    Actor.findAll().then(objects => res.json(objects)).catch(error => res.send(error));
}

function index(req,res,next){
    const id = req.params.id;
    Actor.findByPk(id).then(object => res.json(object)).catch(error => res.send(error));
}

function replace(req,res,next){
    const id = req.params.id;
    Actor.findByPk(id).then(object =>{
        const name = req.body.name ? req.body.name : "";
        const lastName = req.body.lastName ? req.body.lastName : "";
        object.update({
            name: name,
            lastName:lastName
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function update(req,res,next){
    const id = req.params.id;
    Actor.findByPk(id).then(object =>{
        const name = req.body.name ? req.body.name : object.name;
        const lastName = req.body.lastName ? req.body.lastName : object.lastName;
        object.update({
            name: name,
            lastName: lastName
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function destroy(req,res,next){
    const id = req.params.id;
    Actor.destroy({where : {id: id}}).then(object => res.json(object)).catch(error => res.send(error));
}

module.exports = {
    list, index, create, replace, update, destroy
};