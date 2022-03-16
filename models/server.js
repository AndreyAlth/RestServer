const express = require('express');
const cors = require('cors');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //middlewares

        //Rutas de mi aplicacion
        this.routes();
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