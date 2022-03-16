const { Router } = require('express');
const { usersGet, 
        usersPut,  
        usersPost, 
        usersDelete, 
        usersPath }
         = require('../controllers/users.controllers');


const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPath);


module.exports = router;