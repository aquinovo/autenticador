var express = require('express');
var router = express.Router();
var user = require('../model/users');

/* GET users listing. */
consultar=function(req, res) {
  user.get(res);
};

/*GET consultar usuario por id*/ 
consultarporid=function(req, res) {
  user.consultarporid(req.params.id,res);
};

/*POST crear un usuario*/
crear=function(req, res) {
  user.create(req.body, res);
};
/*PUT actualizar un usuario*/
actualizar=function(req, res) {
      user.update(req.body, res);
};
/*DELETE eliminar un usuario por id*/
eliminar=function(req, res) {	 
  user.delete(req.params.id, res);
};
 
router.get('/',consultar);
router.get('/:id',consultarporid); 
router.post('/',crear);
router.put('/',actualizar);
router.delete('/:id',eliminar); 

module.exports = router;