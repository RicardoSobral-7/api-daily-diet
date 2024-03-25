import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function userControllers(app: FastifyInstance) {
  app.post('/', async (req, rep) => {
    const createUserBodySchema = z.object({
      full_name: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { full_name, email, password } = createUserBodySchema.parse(req.body)
  })
}
