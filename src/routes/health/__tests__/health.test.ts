import app from '../../../app'
import request from 'supertest'

describe('GET /health/verify', () => {
  it('response health ', async () => {
    const response = await request(app).get('/health/verify')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Server is fine ✅'
    })
  })
})
