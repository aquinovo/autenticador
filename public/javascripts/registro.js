function comprobar()
{   
	var datos=document.getElementsByName("datos");
	var f = new Date();
	var objeto = {
		  "id": "null", 
		  "first_name": 	datos[0].value,
		  "last_name": 		datos[1].value,
		  "email": 			datos[2].value,
		  "gpassword": 		datos[3].value,
		  "gaservice_id": 	1,
		  "registered_at": 	f.getFullYear()+"."+(f.getMonth()+1)+"."+f.getDate()
	};
	$.ajax({
		url: "/users",
		type: "POST",
		data: objeto,
		success: function (data, status, jqXHR) {
			console.log("Local success callback: "+data);
		},
		error: function (jqXHR, status, err) {
			console.log("Local error callback: "+err);
		},
		complete: function (jqXHR, status) {
			console.log("Local completion callback.");
		}
	});
}