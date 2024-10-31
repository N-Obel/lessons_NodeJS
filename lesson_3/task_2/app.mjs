//========================================================================================================================================================
// Задача 2. -->> Розробити серверну частину додатку, який за відповідними маршрутами 
//							(“/”, “/coffee”, “/music”) повертає створені HTML документи.
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

app.get('/', (req, res) => {
	let aboutPage = path.join(absolutePath, 'index.html')
	res.sendFile(aboutPage)
})
app.get('/coffee', (req, res) => {
	let coffeePage = path.join(absolutePath, 'coffee.html')
	res.sendFile(coffeePage)
})
app.get('/music', (req, res) => {
	let musicPage = path.join(absolutePath, 'music.html')
	res.sendFile(musicPage)
})

//========================================================================================================================================================
app.listen(port, () => {
	console.log(`Server create on ${port}`);
})
//========================================================================================================================================================
