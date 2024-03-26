import { knex } from '../../database'

type TAuth = { email: string }

export async function Auth({ email }: TAuth) {
  const user = await knex('users').select('*').where({ email }).first()
  return user
}
