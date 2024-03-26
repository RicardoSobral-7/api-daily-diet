import fastify from 'fastify'
import { routes } from './Routes'

export const app = fastify()

app.register(routes)
