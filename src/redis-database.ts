import * as redis from 'redis'

export default async function connectDatabase() {
  const redisClient = redis.createClient()
  redisClient.on('error', error => console.error(`Error : ${error}`))

  await redisClient.connect()

  console.log('Redis connecting successful')

  return { redisClient }
}
