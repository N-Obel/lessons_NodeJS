//========================================================================================================================================================
// Задача 2. -->> Користувач через роут ‘/save_num/число’ може передати на сервер якесь число. 
// 			Ці числа поступово треба зберігати у текстовому файлі numbers.txt. Наприклад, використовуючи такий роут:
// 						http://localhost:3000/save_num/78  -  у файл треба додати число 78.
// 			А використовуючи роути  ‘/sum’ – знайтиe суму, ‘mult’ –знайти добуток. За роутом «/remove» файл треба видалити.
//========================================================================================================================================================

import { createServer } from 'node:http';
import fs from 'fs';

const server = createServer((req, res) => {
	const pathToNumbers = 'numbers.txt';
	const path = req.url;

	if (path.startsWith('/save_num/')) {
		const number = path.split('/')[2];

		if (!isNaN(number)) {
			fs.appendFile(pathToNumbers, `${number}\n`, (err) => {
				if (err) {
					console.error('Помилка при записі у файл:', err);
					res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
					res.end('Помилка при збереженні числа.');
				} else {
					res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
					res.end(`Число ${number} успішно збережено!`);
				}
			});
		} else {
			// Якщо введено не число
			res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Будь ласка, введіть дійсне число.');
		}
	} else if (path === '/sum') {
		//---Сума---
		fs.readFile(pathToNumbers, 'utf8', (err, data) => {
			if (err) {
				console.error('Помилка при читанні файлу:', err);
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Помилка при отриманні суми.');
				return;
			}
			const numbers = data.split('\n').filter(Boolean).map(Number);
			const sum = numbers.reduce((prevSum, el) => prevSum + el, 0);
			res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end(`Сума чисел: ${sum}`);
		});
	} else if (path === '/mult') {
		//---Добуток---
		fs.readFile(pathToNumbers, 'utf8', (err, data) => {
			if (err) {
				console.error('Помилка при читанні файлу:', err);
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Помилка при отриманні добутку.');
				return;
			}
			const numbers = data.split('\n').filter(Boolean).map(Number);
			const prod = numbers.reduce((prevEl, el) => prevEl * el, 1);
			res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end(`Сума чисел: ${prod}`);
		});
	} else if (path === '/remove') {
		//---Видалення---
		fs.unlink(pathToNumbers, (err) => {
			if (err) {
				console.error('Помилка при читанні файлу:', err);
				res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('Помилка при видаленні файлу.');
				return;
			}
			res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end(`Файл ${pathToNumbers} видалено!`);
		});
	} else {
		// Інша відповідь для всіх інших маршрутів
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Bad gateway!');
	}
});

server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000');
});

//========================================================================================================================================================
