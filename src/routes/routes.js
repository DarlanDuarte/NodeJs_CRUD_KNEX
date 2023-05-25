import { Router } from 'express'
import UsersController from '../controllers/UsersController'

const router = new Router()

router.get('/', (req, res) => {
  res.send('Servidor Rodando')
})

router.post('/users', UsersController.createUser)
router.get('/users', UsersController.getAllUser)
router.get('/users/:id', UsersController.getUser)
router.delete('/users/:email', UsersController.deleteUser)
router.put('/users/:email', UsersController.updateUsers)

export default router
