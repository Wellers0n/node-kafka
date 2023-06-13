import app from '../../../app'
import request from 'supertest'

describe('GET /publish', () => {
  it('response publish ip required', async () => {
    const response = await request(app)
      .post('/publish')
      .send({})
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Ip is required'
    })
  })
  it('response publish with clientId is required ', async () => {
    const response = await request(app)
      .post('/publish')
      .send({
        ip: '126.193.29.79'
      })
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'clientId is required'
    })
  })
  it('response publish with timestamp is required ', async () => {
    const response = await request(app)
      .post('/publish')
      .send({
        ip: '126.193.29.79',
        clientId: 'cb581118-3faa-4c13-89d0-cde342a81ac5'
      })
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({
      message: 'Timestamp is required'
    })
  })
})
