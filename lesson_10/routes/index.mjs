import express from 'express'
import mainRoutes from './mainRoutes.mjs'
import carsRoutes from './carsRoutes.mjs'
// ---------------------
import authRoutes from './authRoutes.mjs'
import userRoutes from './userRoutes.mjs'
// ---------------------

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
// ---------------------
router.use('/', mainRoutes)
router.use('/cars', carsRoutes)


export default router
