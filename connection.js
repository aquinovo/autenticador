var mysql = require('mysql');
 
function Connection() {
  this.pool = null;
 
  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: 'velasco',
      database: 'autenticador_db'
    });
  };
 
  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
      if (err)
       {
           console.log("Error de conexión" + err);
           return;
       }else
        {
            console.log("Conexión exitosa :)");
        }
    });
  };
}
 
module.exports = new Connection();