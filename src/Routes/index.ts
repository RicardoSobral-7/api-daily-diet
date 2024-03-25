import { FastifyInstance } from 'fastify'
import { userControllers } from '../Controllers/User'
import { mealControllers } from '../Controllers/Meal'

export async function routes(app: FastifyInstance) {
  app.register(userControllers, { prefix: 'users' })
  app.register(mealControllers, { prefix: 'meals' })
}
