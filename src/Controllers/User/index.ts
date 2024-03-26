import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { Create } from '../../Model/User/create'
import { hash, compare } from 'bcrypt'
import { Auth } from '../../Model/User/auth'

export async function userControllers(app: FastifyInstance) {
  app.post('/', async (req, rep) => {
    try {
      const createUserBodySchema = z.object({
        fullName: z.string(),
        email: z.string(),
        password: z.string(),
      })
      const body = createUserBodySchema.safeParse(req.body)

      if (body.success === false) {
        rep.status(400).send()
      } else {
        const { fullName, email, password } = body.data

        hash(password, 8, async (err, hash) => {
          if (err) return

          await Create({ fullName, email, password: hash })
        })

        return rep.status(201).send()
      }
    } catch (error) {
      rep.status(500).send()
    }
  })
  app.post('/auth', async (req, rep) => {
    try {
      const authUserBodySchema = z.object({
        email: z.string(),
        password: z.string(),
      })
      const body = authUserBodySchema.safeParse(req.body)

      if (body.success === false) {
        rep.status(400).send()
      } else {
        const { email, password } = body.data

        const user = await Auth({ email })

        if (user) {
          compare(password, user?.password, (err, res) => {
            if (err) return rep.status(404).send()
            if (res) {
              rep
                .setCookie('sessionId', user.id, {
                  path: '/',
                  maxAge: 60 * 60 * 24, // 24hs
                })
                .status(201)
            } else {
              return rep.status(404).send('Incorrect Email or password')
            }
          })
        } else {
          return rep.status(404).send('User not found')
        }
      }
    } catch (error) {
      rep.status(500).send()
    }
  })
}
