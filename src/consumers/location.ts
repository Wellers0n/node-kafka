import moment from 'moment'
import kafkaConfig from '../config/kafka'
import axios from 'axios'
import redisDatabase from '../redis-database'
import publishLocationStorage from '@/publishers/location-storage'

type Payload = {
  message: {
    value: string
  }
}

type Data = {
  ip: string
  timestamp: number
  clientId: string
  country: string
  latitude: number
  longitude: number
  region: string
  city: string
}

const locationConsumer = async () => {
  const { kafka } = kafkaConfig()

  const { redisClient } = await redisDatabase()

  const consumer = kafka.consumer({
    groupId: 'location-group'
  })

  await consumer.connect()
  await consumer.subscribe({ topic: 'location' })

  await consumer.run({
    eachMessage: async ({ message }: Payload) => {
      if (!message.value) return

      const location = await JSON.parse(message.value)

      const userSession = await redisClient.hGetAll(location.clientId)

      const timestamp = moment(location.timestamp * 1000).add(30, 'minutes')

      const timestampNow = moment()

      const is30MinLater = moment(timestamp).isBefore(timestampNow)

      if (is30MinLater || !userSession?.ip) {
        const { data } = await axios.get(
          `${process.env.IPSTACK_URL}/${location.ip}`,
          {
            params: {
              access_key: process.env.IPSTACK_ACCESS_KEY
            }
          }
        )

        const update = {
          ip: data.ip as string,
          timestamp: location.timestamp as number,
          clientId: location.clientId as string,
          country: data.country_name as string,
          latitude: data.latitude as number,
          longitude: data.longitude as number,
          region: data.region_name as string,
          city: data.city as string
        }

        await redisClient.hSet(location.clientId, update)

        publishLocationStorage({
          payload: update
        })
      } else {
        publishLocationStorage({
          payload: {
            ip: userSession.ip,
            timestamp: userSession.timestamp,
            clientId: userSession.clientId,
            country: userSession.country,
            latitude: userSession.latitude,
            longitude: userSession.longitude,
            region: userSession.region,
            city: userSession.city
          }
        })
      }
    }
  })
}

export default locationConsumer
