const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //conectar a base de datos
        this.conectarDB();


        //middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo de body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use('/api/users', require('../routes/user'));
    }

    listen(){
        this.app.listen(process.env.PORT, ()=> {
            console.log('Servidor correindo en puerto', this.port);
        })
    }

}

module.exports = Server;