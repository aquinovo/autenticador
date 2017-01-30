var connection = require('../connection');
 
function aservice() {
  	this.get = function(res) {
    	connection.acquire(function(err, con) {
      		con.query('select * from aservice', function(err, result) {
	        	con.release();
	        	res.send(result);
      		});
    	});
  };

    this.consultarporid = function(id, res) {
        connection.acquire(function(err, con) {
            con.query("select * from aservice where id = "+id+";", function(err, result) {
	            con.release();
	            res.send(result);
            });
        });
    };

  this.create = function(aservice, res) { 
      //console.log("datos: "+aservice);    
      connection.acquire(function(err, con) {
        con.query("insert into aservice values("+aservice.id+",'"+aservice.name+"','"+aservice.ip+"','"+aservice.protocol+"');", function(err, result) {
          con.release();
          if (err) {
            res.send({status: 1, message: 'ASERVICE creation failed'});
      
          } else {
            res.send({status: 0, message: 'ASERVICE created successfully'});
    
          }
        });
      });
    };

    this.update = function(aservice, res) {
        connection.acquire(function(err, con) {
          con.query("update aservice set name='"+aservice.name+"', ip='"+aservice.ip+"', protocol='"+aservice.protocol+"' where id="+aservice.id+";", function(err, result) {
            con.release();
            if (err) {
              res.send({status: 1, message: 'ASERVICE update failed'});
            } else {
              res.send({status: 0, message: 'ASERVICE updated successfully'});
            }
          });
        });
      };

    this.delete = function(id, res) {
          connection.acquire(function(err, con) {
            con.query('delete from aservice where id = ?', id, function(err, result) {
              con.release();
              if (err) {
                res.send({status: 1, message: 'Failed to delete ASERVICE'});
              } else {
                console.log(id);
                res.send({status: 0, message: 'Deleted successfully ASERVICE'});
              }
            });
          });
    };
}
module.exports = new aservice();