import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Магазин ігор'
  })
})

export default router