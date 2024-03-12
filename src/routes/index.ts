import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {
  app.register({ prefix: 'users' })
}
