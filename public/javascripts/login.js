function comprobar()
{   
	
	var datos=document.getElementsByName("datos");
	var objeto = {
		  "email": 			datos[0].value,
		  "gpassword": 		datos[1].value
	};
	function login(miCallback){
		$.ajax({
			url: "/auth",
			type: "POST",
			data: objeto,
			success: function (data, status, jqXHR) {
				console.log("Local success callback: "+data);
				miCallback(data,objeto);
			},
			error: function (jqXHR, status, err) {
				console.log("Local error callback: "+err);
			},
			complete: function (jqXHR, status) {
				console.log("Local completion callback.");
			}
		});
		//miCallback(null);
	}

	login(function(data){
		if(data=="true"){
			console.log(true);
			$.ajax({
				url: "/login",
				type: "POST",
				data: objeto,
				DataType: "HTML",
				success: function (data, status, jqXHR) {
					console.log(data);
				},
				error: function (jqXHR, status, err) {
					console.log("Local error callback: "+err);
				},
				complete: function (jqXHR, status) {
				console.log("Local completion callback.");
				}
			});
		}
	});
}