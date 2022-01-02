const childProcess = require('child_process');

childProcess.exec('node intro.js test txt dolar 100', (err, result) => {
	if (err) console.log('Proceso erroneo');
	console.log(result);
});
