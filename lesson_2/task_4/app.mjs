//========================================================================================================================================================
// Задача 4. -->>  Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) 
//							повертає створені HTML документи (розмістіть їх там же, де і додаток), що описують: 
//							 інформацію про себе, інфорімацію про улюблену кав’ярню,  інформацію про улюблений музичний гурт.
//========================================================================================================================================================


import { createServer } from 'node:http';
import fs from 'fs'

const server = createServer((req, res) => {
	const routes = {
		'/': 'index.html',
		'/coffee': 'coffee.html',
		'/music': 'music.html',
	};

	const filePath = routes[req.url];

	if (filePath) {
		const readStream = fs.createReadStream(filePath);
		readStream.on('error', (err) => {
			console.error('Помилка при читанні файлу:', err);
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('404 - Сторінка не знайдена');
		});
		res.writeHead(200, { 'Content-Type': 'text/html' });
		readStream.pipe(res);

	} else {
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('Маршрут не знайдено');
	}
});

server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000');
});

//========================================================================================================================================================
