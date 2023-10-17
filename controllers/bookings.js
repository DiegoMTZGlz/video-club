const express = require('express');
const { Booking } = require('../db');

function create(req,res,next){
    const date = req.body.date;
    const memberId = req.body.memberId
    const copyId = req.body.copyId;

    Booking.create({
        date: date,
        memberId: memberId,
        copyId: copyId
    }).then(object => res.json(object)).catch(error => res.send(error));
}

function list(req,res,next){
    Booking.findAll().then(objects => res.json(objects)).catch(error => res.send(error));
}

function index(req,res,next){
    const id = req.params.id;
    Booking.findByPk(id).then(object => res.json(object)).catch(error => res.send(error));
}

function replace(req,res,next){Booking
    const id = req.params.id;
    Booking.findByPk(id).then(object =>{
        const date = req.body.date ? req.body.date : "";
        const memberId = req.body.memberId ? req.body.memberId : "";
        const copyId = req.body.copyId ? req.body.copyId : "";
        object.update({
            date: date,
            memberId: memberId,
            copyId: copyId
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function update(req,res,next){
    const id = req.params.id;
    Booking.findByPk(id).then(object =>{
        const date = req.body.date ? req.body.date : object.date;
        const memberId = req.body.memberId ? req.body.memberId : object.memberId;
        const copyId = req.body.copyId ? req.body.copyId : object.copyId;
        object.update({
            date: date,
            memberId: memberId,
            copyId: copyId
        }).then(obj => res.json(obj)).catch(error => res.send(error));
    }).catch(error => res.send(error));
}

function destroy(req,res,next){
    const id = req.params.id;
    Booking.destroy({where : {id: id}}).then(object => res.json(object)).catch(error => res.send(error));
}

module.exports = {
    list, index, create, replace, update, destroy
};