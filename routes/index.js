var express = require('express');
var router = express.Router();
var index = require('../model/index');
var session = require('../model/sesion');
var http = require('http');
http.post = require('http-post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/*GET html para registro*/
router.get('/uiusers', function(req, res, next) {
  res.render('registro');
});

/*GET html para administrador*/
router.get('/uiadmin', function(req, res, next) {
  res.render('admin');
});

/*GET html para usuario*/
router.get('/uiuser', function(req, res, next) {
  res.render('admin');
});

/*GET html para servicio*/
router.get('/uiservice', function(req, res, next) {
  res.render('servicios');
});

/*GET html para aservicio*/
router.get('/uiaservice', function(req, res, next) {
  res.render('aservicio');
});

/*GET html para rol*/
router.get('/uirol', function(req, res, next) {
  res.render('roles');
});

/**/
auth=function(req, res) {
  index.auth(req.body, res);
};



router.post('/auth',auth);
router.post('/login', function(req, res) {
	
    var data = {
		"email": req.body.email,
		"gpassword": req.body.gpassword,
    }; 

    console.log(data);

	http.post('http://localhost:3000/auth',data, function(result){
		result.on('data', function(respuesta) {
			if(respuesta=="true"){
				req.session.email = req.body.email;
				var info = {sid: req.sessionID, email: req.session.email, rols: null};
				session.create(info,res);
				res.redirect('/uiadmin/?sid=' + req.sessionID);
			}
			else{
				res.redirect('/');
			}
		});
	});

});

router.get('/logout', function(req, res) {
    session.update(req.sessionID, res);
    console.log(res);  
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
