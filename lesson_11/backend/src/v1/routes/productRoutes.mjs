import express from 'express'
import ProductController from '../controllers/productController.mjs'

import upload from '../../../middleware/UploadManager.mjs'

const router = express.Router()

router.get('/', ProductController.getAllProducts)

router.get('/edit/:id', ProductController.getProduct)

router.post('/addForm/:id?', upload.single('image'), ProductController.registerProduct)
// router.put('/:id', upload.single('image'), ProductController.registerProduct)
router.delete('/delete', ProductController.deleteProduct)

export default router
