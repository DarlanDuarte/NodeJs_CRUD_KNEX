import UsersServices from '../services/UsersServices'

class UserController {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body

      const user = await UsersServices.createUser({ name, email, password })

      if (user.existUser) {
        return res.status(409).json(user.messageError)
      }

      if (user.invalid) {
        return res.status(409).json(user.invalid)
      }

      if (user.result !== undefined) return res.status(201).send('Usuário Criando Com Sucesso!')
    } catch (e) {
      res.status(400).json({ message: `Error Ao Criar Usuário` })
    }
  }

  async getAllUser(req, res) {
    const users = await UsersServices.findAllUsers()

    if (users !== undefined) {
      return res.status(200).json({ users })
    } else {
      return res.status(400).json(`Usuários não encontrado!`)
    }
  }

  async getUser(req, res) {
    try {
      const id = req.params.id

      const user = await UsersServices.findUser({ id })

      if (user.msgError) {
        return res.status(404).json(user.msgError)
      }

      if (user.invalid) {
        return res.status(404).json(user.invalid)
      }

      if (user.messageError) return res.status(404).json(user.messageError)

      if (user.result) return res.status(200).json(user.result.user)
    } catch (e) {
      return e.message
    }
  }

  async deleteUser(req, res) {
    try {
      const email = req.params.email

      const user = await UsersServices.delete({ email })

      console.log(user)
      if (!user.result) {
        res.status(404).json(user)
      }

      res.status(200).json(user.result.sucess)
    } catch (e) {
      console.log(e.message)
    }
  }

  async updateUsers(req, res) {
    const email = req.params.email
    const { newEmail, newPassword } = req.body

    const updateUser = await UsersServices.update({ email, newEmail, newPassword })

    if (updateUser.messageError) return res.status(404).json(updateUser.messageError)
    if (updateUser.msg) return res.status(404).json(updateUser.msg)
    if (updateUser.result.msgError) return res.status(404).json(updateUser.result.msgError)

    res.status(200).json(updateUser.result.user)
  }
}

export default new UserController()
