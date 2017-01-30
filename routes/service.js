var express = require('express');
var router = express.Router();
var service = require('../model/service');

/* GET services listing. */
consultar=function(req, res) {
  service.get(res);
};

/*GET consultar servicio por id*/ 
consultarporid=function(req, res) {
  service.consultarporid(req.params.id,res);
};

/*POST crear un servivio*/
crear=function(req, res) {
  service.create(req.body, res);
};
/*PUT actualizar un servicio*/
actualizar=function(req, res) {
      service.update(req.body, res);
};
/*DELETE eliminar un servivio por id*/
eliminar=function(req, res) {	 
  service.delete(req.params.id, res);
};
 


 

router.get('/',consultar);
router.get('/:id',consultarporid); 
router.post('/',crear);
router.put('/',actualizar);
router.delete('/:id',eliminar); 

module.exports = router;
