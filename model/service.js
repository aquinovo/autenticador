var connection = require('../connection');
 
function service() {
	this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from service', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

   this.consultarporid = function(id, res) {
          connection.acquire(function(err, con) {
            con.query("select * from service where id = "+id+";", function(err, result) {
             con.release();
             res.send(result);
            });
          });
        };

  this.create = function(service, res) {     
      connection.acquire(function(err, con) {
        con.query("insert into service values("+service.id+",'"+service.name+"');", function(err, result) {
          con.release();
          if (err) {
            res.send({status: 1, message: 'SERVICE creation failed'});
      
          } else {
            res.send({status: 0, message: 'SERVICE created successfully'});
    
          }
        });
      });
    };

    this.update = function(service, res) {
        connection.acquire(function(err, con) {
          con.query("update service set name='"+service.name+"' where id="+service.id+";", function(err, result) {
            con.release();
            if (err) {
              res.send({status: 1, message: 'SERVICE update failed'});
            } else {
              res.send({status: 0, message: 'SERVICE updated successfully'});
            }
          });
        });
      };

      this.delete = function(id, res) {
          connection.acquire(function(err, con) {
            con.query('delete from service where id = ?', id, function(err, result) {
              con.release();
              if (err) {
                res.send({status: 1, message: 'Failed to delete SERVICE'});
              } else {
                console.log(id);
                res.send({status: 0, message: 'Deleted successfully SERVICEs'});
              }
            });
          });
        };
 
}
module.exports = new service();