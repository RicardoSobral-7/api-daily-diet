import { randomUUID } from 'node:crypto'
import { knex } from '../../database'

type TCreate = {
  fullName: string
  email: string
  password: string
}

export async function Create({ email, fullName, password }: TCreate) {
  await knex('users').insert({
    id: randomUUID(),
    full_name: fullName,
    email,
    password,
  })
}
