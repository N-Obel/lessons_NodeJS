import { Router } from 'express'
import CarsController from '../controllers/carsController.mjs'

import upload from '../middleware/UploadManager.mjs'
import MainPage from '../controllers/mainController.mjs';
import CarValidator from '../validators/carValidator.mjs'
import { checkSchema } from 'express-validator'
import { ensureAdmin, ensureAuthenticated } from '../middleware/auth.mjs'

const router = Router()

router.get('/', MainPage.mainPageInfo)
router.get('/carsList', CarsController.carsList)

router.get('/edit/:id', ensureAuthenticated, ensureAdmin, CarsController.editForm)
router.post('/edit/:id', upload.single("imgSrc"), CarsController.updateCar)
router.get('/carForm', ensureAuthenticated, ensureAdmin, CarsController.createForm)
router.post('/carForm', ensureAuthenticated, ensureAdmin, upload.single('imgSrc'), checkSchema(CarValidator.carValidationSchema), CarsController.addCar)

router.get('/:id', CarsController.carInfo)
router.delete('/carsList', ensureAuthenticated, ensureAdmin, CarsController.deleteCar)

export default router

