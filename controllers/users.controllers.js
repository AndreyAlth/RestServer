const { request, response } = require('express');

const usersGet = (req, res = response ) => {

    const {q, nombre = 'no name', apikey} = req.query;

    res.json({
        msg: 'get API-controlador',
        q,
        nombre,
        apikey
    });
}

const usersPost = (req, res = response ) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API-controlador',
        nombre, 
        edad
    });
}

const usersPut = (req, res = response ) => {
    
    const { id } = req.params;
    res.json({
        msg: 'Put API-controlador',
        id
    });
}

const usersPath = (req, res = response ) => {
    res.json({
        msg: 'Path API-controlador'
    });
}

const usersDelete = (req, res = response ) => {
    res.json({
        msg: 'Delete API-controlador'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPath,
    usersDelete
}