import fastify from 'fastify'
import { routes } from './Routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()
app.register(fastifyCookie)
app.register(routes)
