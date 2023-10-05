const express = require('express');
const { Movie } = require('../db');

function create(req,res,next){
    const title = req.body.title;
    const genreId = req.body.genreId
    const directorId = req.body.directorId;

    Movie.create({
        title: title,
        genreId: genreId,
        directorId: directorId
    }).then(object => res.json(object)).catch(error => res.send(error));
}

function list(req,res,next){
    Movie.findAll().then(objects => res.json(objects)).catch(error => res.send(error));
}

function index(req,res,next){
    const id = req.params.id;
    Movie.findByPk(id).then(object => res.json(object)).catch(error => res.send(error));
}

function replace(req,res,next){Movie
    const id = req.params.id;
    Movie.findByPk(id).then(object =>{
        const title = req.body.title ? req.body.title : "";
        const genreId = req.body.genreId ? req.body.genreId : "";
        const directorId = req.body.directorId ? req.body.directorId : "";
        object.update({
            title: title,
            genreId: genreId,
            directorId: directorId
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function update(req,res,next){
    const id = req.params.id;
    Movie.findByPk(id).then(object =>{
        const title = req.body.title ? req.body.title : object.title;
        const genreId = req.body.genreId ? req.body.genreId : object.genreId;
        const directorId = req.body.directorId ? req.body.directorId : object.directorId;
        object.update({
            title: title,
            genreId: genreId,
            directorId: directorId
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function destroy(req,res,next){
    const id = req.params.id;
    Movie.destroy({where : {id: id}}).then(object => res.json(object)).catch(error => res.send(error));
}

module.exports = {
    list, index, create, replace, update, destroy
};