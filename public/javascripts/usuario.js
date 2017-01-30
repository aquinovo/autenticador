window.addEventListener("load",function(event){
      ver();
});
ver=function(){
	function imprimirdatos(miCallback){
		$.ajax({
			url: "/users",
			type: "GET",
			success: function (data, status, jqXHR) {
				console.log("Local success callback.");
				miCallback(data);
			},
			error: function (jqXHR, status, err) {
				console.log("Local error callback.");
			},
			complete: function (jqXHR, status) {
				console.log("Local completion callback.");
			}
		});

		miCallback(null);
	}


	imprimirdatos(function(data){
        var imprimir=document.getElementById("imprimir"); 
        imprimir.innerHTML="";
        for(x in data){
        	var a = document.createElement("A");
			a.setAttribute("href","#");
			a.setAttribute("class","info");
            a.setAttribute("onclick","accion("+data[x].id+")");
			
			var div = document.createElement("DIV");
			div.setAttribute("class","div-info");
			div.setAttribute("id",data[x].id);

			var ul = document.createElement("UL");
			ul.setAttribute("class","lista");

			var li = document.createElement("LI");
			li.setAttribute("class","info");
			text=document.createTextNode(data[x].first_name+" "+data[x].last_name+" "+data[x].email);

			li.appendChild(text);
			ul.appendChild(li);
			div.appendChild(ul);
			a.appendChild(div);
			imprimir.appendChild(a);
        }

	});

}

crear=function(){
	//console.log("registrar");
    toggle_visibility('popup-box1');
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
			console.log("Local success callback. "+data);
		},
		error: function (jqXHR, status, err) {
			console.log("Local error callback. "+data);
		},
		complete: function (jqXHR, status) {
			console.log("Local completion callback.");
		}
	});
	var imprimir=document.getElementById("imprimir");
	datos[0].value="";
    datos[1].value="";
	datos[2].value="";
    datos[3].value="";
	imprimir=innerHTML="";
	ver();
}
accion=function(id){
	//console.log(id);
    eliminar=document.getElementById("eliminar");
    modificar=document.getElementById("modificar");
    renovar=document.getElementById("renovar");
    color=document.getElementById(id);
    changeColor(color);
	eliminar.addEventListener("click",function(event){
          console.log("Eliminar a: "+id);
          $.ajax({
				url: "/users/"+id,
				type: "DELETE",
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
          location.reload();
    });

    modificar.addEventListener("click",function(event){
          console.log("modificar a: "+id);
          toggle_visibility('popup-box2');

          function imprimirdatos2(miCallback){

				$.ajax({
					url: "/users/"+id,
					type: "GET",
					success: function (data, status, jqXHR) {
						console.log("Local success callback.");
						miCallback(data);
					},
					error: function (jqXHR, status, err) {
						console.log("Local error callback.");
					},
					complete: function (jqXHR, status) {
						console.log("Local completion callback.");
					}
				});
				//miCallback(null);
		 }


		imprimirdatos2(function(data){
		    var mostrar=document.getElementsByName("mostrardatos"); 
		    mostrar[0].value=data[0].first_name;
		    mostrar[1].value=data[0].last_name;
		    mostrar[2].value=data[0].email;
		});
    });
    renovar.addEventListener("click",function(event){
        	console.log("renovar a: "+id);
        	update(id);
        	toggle_visibility('popup-box2');
        	location.reload();
    }); 
}

update=function(id){
	var datos=document.getElementsByName("mostrardatos");
	var f = new Date();
	var objeto = {
		  "id": 			id, 
		  "first_name": 	datos[0].value,
		  "last_name": 		datos[1].value,
		  "email": 			datos[2].value,
		  "gpassword": 		"velasco",
		  "gaservice_id": 	1,
		  "registered_at": 	f.getFullYear()+"."+(f.getMonth()+1)+"."+f.getDate()
	};
	$.ajax({
		url: "/users",
		type: "PUT",
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
	var imprimir=document.getElementById("imprimir");
	imprimir=innerHTML="";
	ver();

}
