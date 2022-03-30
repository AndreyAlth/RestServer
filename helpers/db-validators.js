const Role = require('../models/role');
const Usuario = require('../models/user')

const esRoleValido = async ( rol = '') => {
    console.log(rol);
    const existeRole = await Role.findOne({ rol })
    if (!existeRole){
            throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async( email = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });
    console.log(existeEmail)
    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}

const existUserById = async ( id ) => {
    const existUser = await Usuario.findById(id);
    if( !existUser ){
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existUserById
}