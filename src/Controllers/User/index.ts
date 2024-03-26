import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { Create } from '../../Model/User/create'
import { hash } from 'bcrypt'

export async function userControllers(app: FastifyInstance) {
  app.post('/', async (req, rep) => {
    const createUserBodySchema = z.object({
      fullName: z.string(),
      email: z.string(),
      password: z.string(),
    })
    const { fullName, email, password } = createUserBodySchema.parse(req.body)

    hash(password, 8, async (err, hash) => {
      if (err) return

      await Create({ fullName, email, password: hash })
    })

    return rep.status(201).send()
  })
}
