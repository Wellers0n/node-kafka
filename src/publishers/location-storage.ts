import { Partitioners } from 'kafkajs'
import kafkaConfig from '../config/kafka'

type PublishLocationStorageProps = {
  payload: {
    ip: string
    timestamp: number | string
    clientId: string
    country: string
    latitude: number | string
    longitude: number | string
    region: string
    city: string
  }
}

const publishLocationStorage = async ({
  payload
}: PublishLocationStorageProps) => {
  const { kafka } = kafkaConfig()

  const topic = 'location-storage'

  const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
  })

  await producer.connect()

  console.log(`publishing to ${topic}`, payload)

  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(payload) }]
  })

  await producer.disconnect()
}

export default publishLocationStorage
