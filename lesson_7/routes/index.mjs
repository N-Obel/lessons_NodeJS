import { Router } from 'express'
import MainPage from '../controllers/mainController.mjs'

const router = Router()

router.get('/', MainPage.mainPageInfo)

export default router