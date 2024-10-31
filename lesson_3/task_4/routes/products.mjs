import { Router } from 'express'
import fs from 'fs';

const router = Router()
const pathToFile = 'data/productsData.json'

router.get('/add', (req, res) => {
	res.render('addProduct', {
		title: "Сторінка для додавання нових ігор"
	})
})
router.get('/', (req, res) => {
	fs.readFile(pathToFile, 'utf8', (err, data) => {
		if (err) {
			console.error('Помилка при читанні файлу:', err);
			res.status(500).send('Помилка при завантаженні ігор');
		} else {
			const products = JSON.parse(data);
			res.render('productsList', { products });
		}
	});
})

export default router