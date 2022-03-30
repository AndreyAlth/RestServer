const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

const Usuario = require('../models/user')

const usersGet = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usersPost = async (req, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar el password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
}

const usersPut = async(req, res = response ) => {
    
    const { id } = req.params;
    const { _id, password, google, correo,  ...resto} = req.body;

    ///TODO validar contra base de datos
    if (password){
        //Encriptar el password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        msg: 'Put API-controlador',
        usuario
    });
}

const usersPath = (req, res = response ) => {
    res.json({
        msg: 'Path API-controlador'
    });
}

const usersDelete = async(req, res = response ) => {

    const {id} = req.params;

    ///Lo borramos fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPath,
    usersDelete
}