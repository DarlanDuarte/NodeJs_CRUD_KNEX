import knex from '../database/connnection'

class UserModel {
  async createUser({ name, email, password }) {
    try {
      const user = await knex.insert({ name, email, password }).table('crud')

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async existUser({ email }) {
    const existUser = await knex.select('*').table('crud').where({ email })

    return existUser
  }

  async getAllUsers() {
    try {
      const users = await knex.select(['id', 'name', 'email', 'password']).table('crud')

      return users
    } catch (e) {
      return e.message
    }
  }

  async getUser({ id }) {
    try {
      const user = await knex.select('*').table('crud').where({ id })

      return { user }
    } catch (e) {
      return { msgError: `Não foi possivel pegar o usuario no banco de dados` }
    }
  }

  async deleteUser({ email }) {
    try {
      const dbUser = await knex.table('crud').where({ email }).del()

      if (dbUser !== 1) {
        return { msgError: `Esse Usuário não existe no banco de dados!` }
      } else {
        return { sucess: `Usuário deletado com sucesso!` }
      }
    } catch (e) {
      throw new Error(`Error Ao deletar Usuário!`)
    }
  }

  async updateUser({ email, newEmail, newPassword }) {
    try {
      const dbUpdate = await knex.table('crud').where({ email }).update({ email: newEmail, password: newPassword })

      if (dbUpdate === 0) {
        return { msgError: `Usuário não Existe` }
      }

      const user = await knex.select('*').table('crud').where({ email: newEmail })

      console.log(user)

      return { user }
    } catch (e) {
      throw new Error(`Error ao Atualizar Usuário`)
    }
  }
}

export default new UserModel()
