import Car from '../models/carModel.mjs'
import { validationResult } from 'express-validator'
import fs from 'fs'
import path from 'path'

class CarsController {
	static carsList(req, res) {
		const carsList = Car.loadCarsList()
		res.render('cars/carsList',
			{ cars: carsList }
		)
	}

	static carInfo(req, res) {
		const id = req.params.id
		const car = Car.getCarById(id)
		res.render('cars/carInfo', {
			car,
		})
	}

	static editForm(req, res) {
		const id = req.params.id
		const car = Car.getCarById(id)
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

	static addCar(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const car = req.body

			if (req.params.id) car.id = req.params.id
			return res.status(400).render('cars/carForm', {
				errors: errors.array(),
				car: req.body
			})
		}
		const carImg = req.file ? `/uploads/${req.file.filename}` : '/noImage.png';
		const { carBrand, carYear, carNum } = req.body;
		const carData = { carImg, carBrand, carYear, carNum };
	
		Car.addNewCar(carData);
		res.redirect('/cars/carsList')
	}

	static updateCar(req, res) {
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

		Car.updateCarInfo(req.params.id, car);
		res.redirect('/cars/carsList');
	}

	static deleteCar(req, res) {
		const id = req.body.id
		const car = Car.getCarById(id)
		if (car.imgSrc) {
			const imagePath = path.join('uploads', car.imgSrc.replace(/^\/+/, ''))
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath)
			}
		}
		Car.deleteCarInfo(id)
		res.send(200, { success: true })
		res.redirect('/cars/carsList')
	}
}

export default CarsController