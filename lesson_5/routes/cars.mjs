import { Router } from 'express'
import CarsController from '../controllers/carsController.mjs'
import multer from "multer";
import MainPage from '../controllers/mainController.mjs';

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
router.get('/carForm', CarsController.createForm)
router.get('/:id', CarsController.carInfo)
router.get('/edit/:id', CarsController.editForm)

router.post('/carForm', upload.single("carImg"), CarsController.addCar)
router.post('/edit/:id', upload.single("carImg"), CarsController.updateCar)
router.delete('/carsList', CarsController.deleteCar)

export default router

