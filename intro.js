const params = process.argv.slice(2);
let nombreArchivo = params[0];
let extensionArchivo = params[1];
let indicador = params[2];
let cantidadPesos = Number(params[3]);
// console.log(params);

const https = require('https');
const url = 'https://mindicador.cl/api';

https
	.get(url, (resp) => {
		let data = '';
		resp.on('data', (chunk) => (data += chunk));

		resp.on('end', () => {
			const miIndicador = JSON.parse(data)[indicador];
			// console.log(miIndicador);
			createFile(miIndicador);
		});
	})
	.on('error', (err) => console.error(err.message));

const createFile = (valor) => {
	const texto = `A la fecha: ${new Date()} 
    Fue realizada cotización con los siguientes datos: 
    Cantidad de pesos a convertir: ${cantidadPesos} pesos 
    Convertido a "${indicador}"
    Da un total de: $${cantidadPesos * valor.valor}`;
	const fs = require('fs');
	fs.writeFile(`${nombreArchivo}.${extensionArchivo}`, texto, 'utf-8', () => {
		console.log('Archivo Creado');
		console.log(texto);
	});
};
