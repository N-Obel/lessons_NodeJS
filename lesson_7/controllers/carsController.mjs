import CarsDBService from "../models/CarsDBService.mjs";
import { validationResult } from 'express-validator';
import fs from 'fs'
import path from 'path'

class CarsController {
	static async carsList(req, res) {
		try {
			const carsList = await CarsDBService.getList()
			console.log('=========carsList')
			console.log(carsList)
			res.render('cars/carsList', {
				cars: carsList,
			})
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static async carInfo(req, res) {
		const id = req.params.id
		const car = await CarsDBService.getById(id)
		res.render('cars/carInfo', {
			car,
		})
	}

	static async editForm(req, res) {
		const id = req.params.id
		const car = await CarsDBService.getById(id)
		res.render('cars/carForm', {
			car,
			errors: []
		});
	}

	static createForm(req, res) {
		res.render('cars/carForm', {
			car: {},
			errors: []
		})
	}

	static async addCar(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const car = req.body

			if (req.params.id) car.id = req.params.id
			return res.status(400).render('cars/carForm', {
				errors: errors.array(),
				car: req.body
			})
		}
		const imgSrc = req.file ? `/${req.file.filename}` : '/noImage.png';
		const { carBrand, carYear, carNum } = req.body;
		const carData = { imgSrc, carBrand, carYear, carNum };

		await CarsDBService.create(carData);
		res.redirect('/cars/carsList')
	}

	static async updateCar(req, res) {
		const errors = validationResult(req);
		const car = req.body;

		if (!errors.isEmpty()) {
			if (req.params.id) car.id = req.params.id;
			return res.status(400).render('cars/carForm', {
				errors: errors.array(),
				car
			});
		}

		if (req.file) {
			car.imgSrc = `/${req.file.filename}`;
		}

		await CarsDBService.update(req.params.id, car);
		res.redirect('/cars/carsList');
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
