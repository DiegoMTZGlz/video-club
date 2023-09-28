const express = require ('express');

function create(req, res,next){
    res.send('Users create');
}

function list(req, res, next) {
    res.send('Users list');
}

function index(req, res,next){
    res.send('Users Index');
}

function replace(req, res,next){
    res.send('Users replace');
}

function update(req, res,next){
    res.send('Users update');
}

function destroy(req, res,next){
    res.send('Users destroy');
}

module.exports = {
    list, index, create, replace, update, destroy
};