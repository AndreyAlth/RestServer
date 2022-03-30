const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, 
        usersPut,  
        usersPost, 
        usersDelete, 
        usersPath }
         = require('../controllers/users.controllers');
const { esRoleValido, emailExist, existUserById, emailExiste } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');



const router = Router();

router.get('/', usersGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existUserById ),
        check('rol').custom( esRoleValido ),
        validateFields
], usersPut);

// router.post('/',middleware, usersPost);
// router.post('/',[], usersPost);
router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRoleValido ), 
        validateFields
    ], usersPost );

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existUserById ),
        validateFields
], usersDelete);

router.patch('/', usersPath);


module.exports = router;