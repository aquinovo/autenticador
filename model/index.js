var connection = require('../connection');
 

function index(){
  this.auth = function(user, res) {   
      connection.acquire(function(err, con) {
        con.query("select *from user where gpassword=SHA('"+user.gpassword+"') and email='"+user.email+"';", function(err, result) {
          con.release();
          if (err) {
            res.send({status: 1, message: 'Consult fauled'});
      
          } else {
            console.log(result.length);
            if(result.length==0)
               res.send("false");
             else
               res.send("true");
          }
        });
      });
  }

  this.login = function(user, res) {   
      console.log(user);  
      connection.acquire(function(err, con) {
        con.query("select *from user where gpassword=SHA('"+user.gpassword+"') and email='"+user.email+"';", function(err, result) {
          con.release();
          if (err) {
            res.send({status: 1, message: 'Consult fauled'});
      
          } else {
            res.send(result);
          }
        });
      });
  }
}
module.exports = new index();