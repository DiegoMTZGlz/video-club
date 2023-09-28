const express = require('express');

function create(req,res,next){
    res.send('Directors create');
}

function list(req,res,next){
    res.send('Directors list');
}

function index(req,res,next){
    res.send('Directors index');
}

function replace(req,res,next){
    res.send('Directors replace');
}

function update(req,res,next){
    res.send('Directors update');
}

function destroy(req,res,next){
    res.send('Directors destroy');
}

module.exports = {
    list, index, create, replace, update, destroy
};