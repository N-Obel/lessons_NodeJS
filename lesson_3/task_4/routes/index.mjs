import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('index',
    {
      title: 'task_4'

    })
})

export default router