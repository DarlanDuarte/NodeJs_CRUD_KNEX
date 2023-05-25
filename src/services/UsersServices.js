import UsersModel from '../models/UsersModel'

class UsersServices {
  async createUser({ name, email, password }) {
    const existUser = await UsersModel.existUser({ email })

    if (existUser.length > 0) {
      return { existUser, messageError: `Usuário já existe!` }
    }

    if (!name || !email || !password) {
      return { invalid: `Suas credenciais não foram Passadas corretamente` }
    }

    const result = await UsersModel.createUser({ name, email, password })

    return {
      result,
    }
  }

  async findAllUsers() {
    try {
      const result = await UsersModel.getAllUsers()

      return result
    } catch (e) {
      return { messageError: `Ocorreu um error onde não foi possivel encontrar usuários listados! ` }
    }
  }

  async findUser({ id }) {
    try {
      if (id === undefined) return { invalid: `Credenciais incorretas` }

      const result = await UsersModel.getUser({ id })

      if (result.msgError) {
        return { msgError }
      }

      if (result.user.length > 0) {
        return { result }
      } else {
        throw new Error(`Esse Usuário nao existe!`)
      }
    } catch (e) {
      return { messageError: e.message }
    }
  }

  async delete({ email }) {
    try {
      if (!email) return { messageError: `Não foi passado um usuário existente!` }

      const result = await UsersModel.deleteUser({ email })

      if (result.msgError) {
        return result.msgError
      }

      return { result }
    } catch (e) {
      return e.message
    }
  }

  async update({ email, newEmail, newPassword }) {
    try {
      if (!newEmail || !newPassword) {
        return { msg: `Novo Email ou Novo Passoword não estão sendo passados!` }
      }

      const result = await UsersModel.updateUser({ email, newEmail, newPassword })

      return { result }
    } catch (e) {
      return { messageError: e.message }
    }
  }
}

export default new UsersServices()
