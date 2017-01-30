var express = require('express');
var router = express.Router();
var aservice = require('../model/aservice');

/*GET consultar todos los servicios de autentitación*/
consultar=function(req, res) {
  aservice.get(res);
};

/*GET consultar aservice por id*/ 
consultarporid=function(req, res) {
  aservice.consultarporid(req.params.id,res);
};

/*POST crear un aservice*/
crear=function(req, res) {	
  aservice.create(req.body, res);
};
/*PUT actualizar un aservice*/
actualizar=function(req, res) {
  aservice.update(req.body, res);
};
/*DELETE eliminar un aservice por id*/
eliminar=function(req, res) {	 
  aservice.delete(req.params.id, res);
};

router.get('/',consultar);
router.get('/:id',consultarporid); 
router.post('/',crear);
router.put('/',actualizar);
router.delete('/:id',eliminar); 

module.exports = router;