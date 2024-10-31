import ProductsController from '../controllers/productsController.mjs'
import {Router} from 'express'

const router = Router()

router.get('/', ProductsController.mainProducts)
router.get('/add', ProductsController.addProduct)
router.get('/:id', ProductsController.productDetail)
router.post('/', ProductsController.createProduct)

export default router