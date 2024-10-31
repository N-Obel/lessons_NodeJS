//========================================================================================================================================================
// Задача 3. -->>  Через параметри запиту передають операцію (add, subtract, mult) і числа (розділені дефісами), 
// 						які треба опрацювати. Знайти результат і повернути користувачу. Наприклад при запиті:
//								http://localhost:3000/add/12-4-23-45 - треба знайти суму чисел 12,4,23,45
//========================================================================================================================================================

import { createServer } from 'node:http';

const server = createServer((req, res) => {
	let urlPath = req.url.split('/')
	const operation = urlPath[1]
	const numbersArr = urlPath[2]?.split('-').map(Number);

	if (!numbersArr) {
		res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
		res.end('Числа не задано')
		return
	}

	let result
	switch (operation) {
		case 'add':
			result = numbersArr.reduce(
				(prevEl, el) => prevEl + el
			)
			break;
		case 'subtract':
			result = numbersArr.reduce(
				(prevEl, el) => prevEl - el
			)
			break;
		case 'mult':
			result = numbersArr.reduce(
				(prevEl, el) => prevEl * el, 1
			)
			break;
		default:
			res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Невідома операція. Використовуйте add, subtract або mult.');
			break;
	}
	res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
	res.end(`Результат обчислення операції ${operation} = ${result}`)
});

server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000');
});

//========================================================================================================================================================
