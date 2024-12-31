import { Router } from 'express'
import AuthController from "../controllers/authController.mjs";

const router = new Router()

// Маршрут для відображення форми логіну
router.get('/login', AuthController.loginForm)

// Маршрут для обробки логіну
router.post('/login', AuthController.login);

// Маршрут для виходу з системи
router.get('/logout', AuthController.logout);

export default router
