// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      full_name: string
      email: string
      password: string
      created_at: string
    }
    meals: {
      id: string
      name: string
      description: string
      isPartOfDiet: string
      user_id_meal: string
      created_at: string
    }
  }
}
