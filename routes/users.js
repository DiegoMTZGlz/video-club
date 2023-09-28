const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

/* GET users listing. */
router.post('/', controller.create)

router.get('/',controller.list);    // la jerarquia importa, por url, el que esta primera es el que se va a ejecutar
                                    // el orden de los controladores afecto la funcion final.
router.get('/:id', controller.index);

router.put('/:id', controller.replace);

router.patch('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
