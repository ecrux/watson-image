/**
* Autor: Camilo Figueroa - Edwar Cruz
* Fecha: 12/03/20
* Actialización 1: 12/03/20
*/
console.log("aqui estamos volando");

//capturamos los elementos del DOM, para posteriormente ser procesados por las ootras funciones 
var btnCharge = document.getElementById('btn_charge');
var boxUrl = document.getElementById('url_img');
var windowImg = document.getElementById('window_img');
var tbody = document.getElementById('tbody');

/**
* Esta es el capturador del evento de boton que activa la busqueda 
* y análisis de la imagen 
*/
btnCharge.addEventListener('click',function() {
	apiWatson();
})

/**
* Agregamos la funcionalidad para que una vez este en el input la url
* la pinte en el cuadro de la imagen
*/
boxUrl.addEventListener('change',function(){
	windowImg.src = boxUrl.value
})


/**
* Funcion encargada de hacer la conexión a la api de watson para que realize el análisis
* de la imagen incrustada en el input  
* 
*/
function apiWatson() {

	//Credenciales de acceso a la api de watson
	let username = 'apikey';
	let password = 'nOPbcN7er2b5U4mmAXlbvukvg3ch93CCh5YGdfLbrwXB';
	let headers = new Headers();


	let version = '2018-03-19';
	let url = boxUrl.value;


	headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

	fetch('https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version='+version+'&url='+url, {
		headers: headers,
	}).then((response) => response.json())
	.then((responseJson) => {
		console.log(responseJson);
		paintClass(responseJson);
	})
	.catch((error) => {
		console.error(error);
	});
}

/**
* Función encargada de pintar toda la información consultada
* la pinta en una tabla de DOM 
*/
function paintClass(response) {
	let classifiers = response.images[0].classifiers[0].classes;
	console.log(response.images[0].classifiers[0]);
	let salida = '';
	classifiers.forEach((classifier,idx) => {
		//console.log(classifier.class)
		salida += `<tr>
						<td>${classifier.class}</td>
						<td>${classifier.score}</td>
					</tr>`;
	})
	//console.log(salida);
	tbody.innerHTML = salida;
}




