//========================================================================================================================================================
// Задача 5. -->>  Створити додаток з історією. У файлі json зберігаємо усі роути та кількість відвідувань. 
//							У налаштуваннях settings.json зберігати який роут треба використати 
//								для перегляду історії та назву файлу де зберігається історія
//========================================================================================================================================================


import { createServer } from 'node:http';
import fs from 'fs'

const settingsPath = 'settings.json'
const historyPath = 'history.json'

function getSettings(callback) {
	fs.readFile(settingsPath, 'utf-8', (err, data) => {
		if (err) {
			console.error('Помилка зчитування файлу: ', err)
			callback(err)
		} else {
			callback(null, JSON.parse(data))
		}
	})
}

function getHistory(callback) {
	fs.readFile(settingsPath, 'utf-8', (err, data) => {
		if (err) {
			console.error('Помилка зчитування історії: ', err)
			callback(err)
		} else {
			callback(null, JSON.parse(data))
		}
	})
}



const server = createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World!\n');
});


server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000');
});







//========================================================================================================================================================
