import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'

const router = express.Router()

router.get('/register', UserController.registerForm)
router.post('/register', checkSchema(UserValidator.userSchema), UserController.registerUser)

export default router
