window.addEventListener("load",function(event){
      ver();
});
ver=function(){
	function imprimirdatos(miCallback){
		$.ajax({
			url: "/rol",
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
			text=document.createTextNode(data[x].name+" "+data[x].code);

			li.appendChild(text);
			ul.appendChild(li);
			div.appendChild(ul);
			a.appendChild(div);
			imprimir.appendChild(a);
        }

	});

}

crear=function(){
	console.log("registrar");
    toggle_visibility('popup-box1');
	var datos=document.getElementsByName("datos");
	var objeto = {
		  "id": "null", 
		  "name": 			datos[0].value,
		  "code": 			datos[1].value
	};
	$.ajax({
		url: "/rol",
		type: "POST",
		data: objeto,
		success: function (data, status, jqXHR) {
			console.log("Local success callback.");
		},
		error: function (jqXHR, status, err) {
			console.log("Local error callback.");
		},
		complete: function (jqXHR, status) {
			console.log("Local completion callback.");
		}
	});
	var imprimir=document.getElementById("imprimir");
	imprimir=innerHTML="";
	datos[0].value="";
    datos[1].value="";
	ver();
}

accion=function(id){
	console.log(id);
    eliminar=document.getElementById("eliminar");
    modificar=document.getElementById("modificar");
    renovar=document.getElementById("renovar");
    color=document.getElementById(id);
    changeColor(color);
	eliminar.addEventListener("click",function(event){
          console.log("Eliminar a: "+id);
          $.ajax({
				url: "/rol/"+id,
				type: "DELETE",
				success: function (data, status, jqXHR) {
					console.log("Local success callback.");
				},
				error: function (jqXHR, status, err) {
					console.log("Local error callback.");
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
					url: "/rol/"+id,
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
		    mostrar[0].value=data[0].name;
		    mostrar[1].value=data[0].code;
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
		  "name": 			datos[0].value,
		  "code": 			datos[1].value
	};
	$.ajax({
		url: "/rol",
		type: "PUT",
		data: objeto,
		success: function (data, status, jqXHR) {
			console.log("Local success callback.");
		},
		error: function (jqXHR, status, err) {
			console.log("Local error callback.");
		},
		complete: function (jqXHR, status) {
			console.log("Local completion callback.");
		}
	});
	var imprimir=document.getElementById("imprimir");
	imprimir=innerHTML="";
	ver();

}
