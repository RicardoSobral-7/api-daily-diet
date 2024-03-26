import { execSync } from 'node:child_process'
import { afterAll, beforeAll, expect, describe, it, beforeEach } from 'vitest'
import { app } from '../../src/app'
import request from 'supertest'

describe('User Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('Should be able to create a new User', async () => {
    const response = await request(app.server).post('/users').send({
      fullName: 'Ricardo Sobral',
      email: 'riki.sobral@gmail.com',
      password: '123',
    })
    expect(response.statusCode).toEqual(201)
  })
})
