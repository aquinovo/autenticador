var express = require('express');
var router = express.Router();
var rol = require('../model/rol');

/* GET rol listing. */
consultar=function(req, res) {
  rol.get(res);
};

/*GET consultar rol por id*/ 
consultarporid=function(req, res) {
  rol.consultarporid(req.params.id,res);
};

/*POST crear un rol*/
crear=function(req, res) {
  rol.create(req.body, res);
};
/*PUT actualizar un rol*/
actualizar=function(req, res) {
      rol.update(req.body, res);
};
/*DELETE eliminar un rol por id*/
eliminar=function(req, res) {	 
  rol.delete(req.params.id, res);
};
 
router.get('/',consultar);
router.get('/:id',consultarporid); 
router.post('/',crear);
router.put('/',actualizar);
router.delete('/:id',eliminar); 

module.exports = router;