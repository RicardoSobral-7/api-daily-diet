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

  describe('Users Router', () => {
    describe('Users Creation', () => {
      it('Should be able to create a new User', async () => {
        const response = await request(app.server).post('/users').send({
          fullName: 'Ricardo Sobral',
          email: 'riki.sobral@gmail.com',
          password: '123',
        })
        expect(response.statusCode).toEqual(201)
      })

      it('Should not be able to create a new User without name', async () => {
        const response = await request(app.server).post('/users').send({
          email: 'riki.sobral@gmail.com',
          password: '123',
        })
        expect(response.statusCode).toEqual(400)
      })

      it('Should not be able to create a new User without email', async () => {
        const response = await request(app.server).post('/users').send({
          fullName: 'Ricardo Sobral',
          password: '123',
        })
        expect(response.statusCode).toEqual(400)
      })

      it('Should not be able to create a new User without password', async () => {
        const response = await request(app.server).post('/users').send({
          fullName: 'Ricardo Sobral',
          email: 'riki.sobral@gmail.com',
        })
        expect(response.statusCode).toEqual(400)
      })
    })
    describe('Users List', () => {})
    describe('Users Auth', () => {})
    describe('Users update', () => {})
    describe('Users Delete', () => {})
  })
})
