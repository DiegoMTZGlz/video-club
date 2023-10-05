const express = require('express');
const { Copy } = require('../db');

function create(req,res,next){
    const number = req.body.number;
    const format = req.body.format;
    const status = req.body.status;
    const movieId = req.body.movieId;

    Copy.create({
        number: number,
        format: format,
        status: status,
        movieId: movieId
    }).then(object => res.json(object)).catch(error => res.send(error));
}

function list(req,res,next){
    Copy.findAll().then(objects => res.json(objects)).catch(error => res.send(error));
}

function index(req,res,next){
    const id = req.params.id;
    Copy.findByPk(id).then(object => res.json(object)).catch(error => res.send(error));
}

function replace(req,res,next){Copy
    const id = req.params.id;
    Copy.findByPk(id).then(object =>{
        const number = req.body.number ? req.body.number : "";
        const format = req.body.format ? req.body.format : "";
        const status = req.body.status ? req.body.status : "";
        const movieId = req.body.movieId ? req.body.movieId : "";
        object.update({
            number: number,
            format: format,
            status: status,
            movieId: movieId
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function update(req,res,next){
    const id = req.params.id;
    Copy.findByPk(id).then(object =>{
        const number = req.body.number ? req.body.number : object.number;
        const format = req.body.format ? req.body.format : object.format;
        const status = req.body.status ? req.body.status : object.status;
        const movieId = req.body.movieId ? req.body.movieId : object.movieId;
        object.update({
            number: number,
            format: format,
            status: status,
            movieId: movieId
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function destroy(req,res,next){
    const id = req.params.id;
    Copy.destroy({where : {id: id}}).then(object => res.json(object)).catch(error => res.send(error));
}

module.exports = {
    list, index, create, replace, update, destroy
};