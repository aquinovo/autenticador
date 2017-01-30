var connection = require('../connection');
function rol() {
	this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from rol', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

   this.consultarporid = function(id, res) {
          connection.acquire(function(err, con) {
            con.query("select * from rol where id = "+id+";", function(err, result) {
             con.release();
             res.send(result);
            });
          });
        };

  this.create = function(rol, res) {
      connection.acquire(function(err, con) {
        con.query("insert into rol values("+rol.id+",'"+rol.name+"','"+rol.code+"');", function(err, result) {
          con.release();
          if (err) {
            res.send({status: 1, message: 'ROL creation failed'});
      
          } else {
            res.send({status: 0, message: 'ROL created successfully'});
    
          }
        });
      });
    };

    this.update = function(rol, res) {
        connection.acquire(function(err, con) {
          con.query("update rol set name='"+rol.name+"', code='"+rol.code+"' where id="+rol.id+";", function(err, result) {
            con.release();
            if (err) {
              res.send({status: 1, message: 'ROL update failed'});
            } else {
              res.send({status: 0, message: 'ROL updated successfully'});
            }
          });
        });
      };

      this.delete = function(id, res) {
          connection.acquire(function(err, con) {
            con.query('delete from rol where id = ?', id, function(err, result) {
              con.release();
              if (err) {
                res.send({status: 1, message: 'Failed to delete ROL'});
              } else {
                console.log(id);
                res.send({status: 0, message: 'Deleted successfully ROL'});
              }
            });
          });
        };
 
}
module.exports = new rol();