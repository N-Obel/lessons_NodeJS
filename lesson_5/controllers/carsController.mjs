import Car from '../models/carModel.mjs'
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
		res.render('cars/carForm', { car })
	}

	static createForm(req, res) {
		res.render('cars/carForm', {
			car: null,
		})
	}

	static addCar(req, res) {
		const carData = req.body
		carData.imgSrc = `/${req.file.filename}`
		Car.addNewCar(carData)
		res.redirect('/cars/carsList')
	}

	static updateCar(req, res) {
		const carData = req.body
		if (req.file) {
			carData.imgSrc = `/${req.file.filename}`
		}
		Car.updateCarInfo(req.params.id, carData)
		res.redirect('/cars/carsList')
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