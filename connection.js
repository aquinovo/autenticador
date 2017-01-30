var mysql = require('mysql');
 
function Connection() {
  this.pool = null;
 
  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'mysql.hostinger.mx',
      user: 'u113757698_root',
      password: 'velasco',
      database: 'u113757698_bd'
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
