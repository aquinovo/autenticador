var connection = require('../connection');
 
function user() {
	this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from user', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.consultarporid = function(id, res) {
          connection.acquire(function(err, con) {
            con.query("select * from user where id = "+id+";", function(err, result) {
             con.release();
             res.send(result);
            });
          });
        };

  this.create = function(user, res) {   
      console.log(user);  
      connection.acquire(function(err, con) {
        con.query("insert into user values("+user.id+",'"+user.first_name+"','"+user.last_name+"','"+user.email+"',SHA('"+user.gpassword+"'),"+user.gaservice_id+",'"+user.registered_at+"');", function(err, result) {
          con.release();
          if (err) {
            res.send({status: 1, message: 'USER creation failed'});
      
          } else {
            res.send({status: 0, message: 'USER created successfully'});
    
          }
        });
      });
    };

    this.update = function(user, res) {
        connection.acquire(function(err, con) {
          con.query("update user set first_name='"+user.first_name+"', last_name='"+user.last_name+"', email='"+user.email+"' where id="+user.id+";", function(err, result) {
            con.release();
            if (err) {
              res.send({status: 1, message: 'USER update failed'});
            } else {
              res.send({status: 0, message: 'USER updated successfully'});
            }
          });
        });
      };

      this.delete = function(id, res) {
          connection.acquire(function(err, con) {
            con.query('delete from user where id = ?', id, function(err, result) {
              con.release();
              if (err) {
                res.send({status: 1, message: 'Failed to delete USER'});
              } else {
                console.log(id);
                res.send({status: 0, message: 'Deleted successfully USER'});
              }
            });
          });
        };
 
}
module.exports = new user();