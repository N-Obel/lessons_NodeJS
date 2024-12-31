import CarsDBService from "../models/car/carsDBService.mjs";
import OwnersDBService from "../models/owner/ownersDBService.mjs";
import { validationResult } from 'express-validator';
import fs from 'fs'
import path from 'path'


class CarsController {
	static async carsList(req, res) {
		try {
			const carsList = await CarsDBService.getList()
			res.render('cars/carsList', {
				cars: carsList,
				//--------------
				user: req.user,
			})

		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static async carInfo(req, res) {
		const id = req.params.id
		const car = await CarsDBService.getById(id)
		const owners = await OwnersDBService.getList()
		res.render('cars/carInfo', {
			car,
			owners,
			user: req.user,
		})
	}

	static async editForm(req, res) {
		const id = req.params.id
		const car = await CarsDBService.getById(id)
		const owners = await OwnersDBService.getList()
		res.render('cars/carForm', {
			car,
			errors: [],
			owners,
			user: req.user
		});
	}

	static async createForm(req, res) {
		const owners = await OwnersDBService.getList()
		res.render('cars/carForm', {
			car: {},
			errors: [],
			owners,
			user: req.user
		})
	}

	static async addCar(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const car = req.body;

			if (req.params.id) car.id = req.params.id;
			const owners = await OwnersDBService.getList();
			return res.status(400).render('cars/carForm', {
				errors: errors.array(),
				car: req.body,
				owners,
				user: req.user,
			});
		}

		const data = { ...req.body };

		if (req.file) {
			data.imgSrc = req.file.buffer.toString('base64');
		} else {
			data.imgSrc = fs.readFileSync('./public/images/noImage.png').toString('base64');
		}

		try {
			await CarsDBService.create(data);
			res.redirect('/cars/carsList');
		} catch (err) {
			console.error(err);
			res.status(500).send('Не вдалося створити авто.');
		}
	}

	static async updateCar(req, res) {
		const errors = validationResult(req);
		const car = { ...req.body };

		if (!errors.isEmpty()) {
			if (req.params.id) car.id = req.params.id;
			return res.status(400).render('cars/carForm', {
				errors: errors.array(),
				car,
				user: req.user,
			});
		}

		if (req.file) {
			car.imgSrc = req.file.buffer.toString('base64');
		} else {
			car.imgSrc = fs.readFileSync('./public/images/noImage.png').toString('base64');
		}

		try {
			await CarsDBService.update(req.params.id, car);
			res.redirect('/cars/carsList');
		} catch (err) {
			console.error(err);
			res.status(500).send('Не вдалося оновити авто.');
		}
	}


	static async deleteCar(req, res) {
		const id = req.body.id
		const car = CarsDBService.getById(id)
		if (car.imgSrc) {
			const imagePath = path.join('uploads', car.imgSrc.replace(/^\/+/, ''))
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath)
			}
		}
		await CarsDBService.deleteById(id)
		res.send(200, { success: true })
		// res.redirect('/cars/carsList')
	}

}

export default CarsController
