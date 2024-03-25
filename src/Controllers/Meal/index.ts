import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function mealControllers(app: FastifyInstance) {
  app.post('/', async (req, rep) => {})
}
