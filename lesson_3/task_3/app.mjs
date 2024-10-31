//========================================================================================================================================================
// Задача 3. -->> Розробити програму з такими функціональними можливостями:
// 					 обробка статичних маршрутів:
// 						“/”	Вітання користувача
// 						“/goals”	Ваші цілі
// 					 обробка статичних файлів:
// 						about	містить тему та умову задачі
// 						news	містить перелік важливі новини (для Вас)
// 					 обробка параметрів запитів:
// 						/info/:myLinks	у залежності від значення параметра повертає сторінку з :
// 						«sites» -  адресами улюблених сайтів
// 						«films» -  адреси улюблених онлайн кінотеатрі
// 						«me» - або інформацію про себе
//========================================================================================================================================================

import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url'
import { dirname } from 'path';

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = path.join(__dirname, 'public');
app.use('/static', express.static('public'))

//------->> 1 <<-------
app.get('/', (req, res) => {
	res.send('Hello!')
})
app.get('/goals', (req, res) => {
	res.send('My goal is to become a full-stack developer')
})
//------->> 2 <<-------
app.get('/about', (req, res) => {
	let aboutPage = path.join(absolutePath, 'about.html')
	res.sendFile(aboutPage)
})
app.get('/news', (req, res) => {
	let newsPage = path.join(absolutePath, 'news.html')
	res.sendFile(newsPage)
})
//------->> 3 <<-------
app.get('/info/:myLinks', (req, res) => {
	const myLinks = req.params.myLinks
	switch (myLinks) {
		case 'sites':
			res.sendFile(path.join(__dirname, 'public/sites.html'))
			break;
		case 'news':
			res.sendFile(path.join(__dirname, 'public/news.html'))
			break;
		case 'about_me':
			res.sendFile(path.join(__dirname, 'public/about_me.html'))
			break;
		default:
			res.status(404).send("Wrong path")
			break;
	}
})
//========================================================================================================================================================
app.listen(port, () => {
	console.log(`Server create on ${port}`);
})
//========================================================================================================================================================
