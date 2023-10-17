const express = require('express');
const { User } = require('../db');

function create(req,res,next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;   

    User.create({
        name: name,
        lastName: lastName,
        email: email,
        username: username,
        password: password   
    }).then(object => res.json(object)).catch(error => res.send(error));
}

function list(req,res,next){
    User.findAll().then(objects => res.json(objects)).catch(error => res.send(error));
}

function index(req,res,next){
    const id = req.params.id;
    User.findByPk(id).then(object => res.json(object)).catch(error => res.send(error));
}

function replace(req,res,next){
    const id = req.params.id;
    User.findByPk(id).then(object =>{
        const name = req.body.name ? req.body.name : "";
        const lastName = req.body.lastName ? req.body.lastName : "";
        const email = req.body.email ? req.body.email : "";
        const username =  req.body.username ? req.body.username : "";
        const password =  req.body.password ? req.body.password : "";
        object.update({
            name: name,
            lastName: lastName,
            email: email,
            username: username,
            password: password   
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function update(req,res,next){
    const id = req.params.id;
    User.findByPk(id).then(object =>{
        const name = req.body.name ? req.body.name : object.name;
        const lastName = req.body.lastName ? req.body.lastName : object.lastName;
        const email = req.body.email ? req.body.email : object.email;
        const username =  req.body.username ? req.body.username : object.username;
        const password =  req.body.password ? req.body.password : object.password;

        object.update({
            name: name,
            lastName: lastName,
            email: email,
            username: username,
            password: password   
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function destroy(req,res,next){
    const id = req.params.id;
    User.destroy({where : {id: id}}).then(object => res.json(object)).catch(error => res.send(error));
}

module.exports = {
    list, index, create, replace, update, destroy
};