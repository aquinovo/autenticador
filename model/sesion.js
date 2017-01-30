var connection = require('../connection');
 
function session() {
  this.create = function(info, res) {   
      connection.acquire(function(err, con) {
        con.query("INSERT INTO session VALUES (null, '" + info.sid + "', '" + info.email + "'," + info.rols +", null , null , null, null);", function(err, result) {
          con.release();
          if (err) {
            err.message = 'Internal Server Error';
            err.status = 500;
            next(err);
            return;
      
          } 
        });
      });
    };

    this.update = function(sid, res) {
        connection.acquire(function(err, con) {
          con.query("UPDATE session SET duration = TIMESTAMPDIFF(MINUTE, created_at, CURRENT_TIMESTAMP) "+"WHERE sid = '" + sid +"';", function(err, result) {
            con.release();
            if (err) {err.message = 'Internal Server Error';
                  err.status = 500;
                  next(err);
                  return;return "false";
            } 
          });
        });
      };
 
}
module.exports = new session();