import { Router } from 'express'
import CarsController from '../controllers/carsController.mjs'
import multer from "multer";
import MainPage from '../controllers/mainController.mjs';
import CarValidator from '../models/carValidator.mjs'
import { checkSchema } from 'express-validator'

const router = Router()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})
const upload = multer({ storage })

router.get('/', MainPage.mainPageInfo)
router.get('/carsList', CarsController.carsList)

router.get('/edit/:id', CarsController.editForm)
router.post('/edit/:id', upload.single("carImg"), CarsController.updateCar)
router.get('/carForm', CarsController.createForm)
router.post('/carForm', upload.single("carImg"), checkSchema(CarValidator.carValidationSchema), CarsController.addCar)

router.get('/:id', CarsController.carInfo)
router.delete('/carsList', CarsController.deleteCar)

export default router

