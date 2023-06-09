import { Partitioners } from 'kafkajs'
import kafkaConfig from '../config/kafka'

type PublishLocationProps = {
  payload: {
    ip: string
    timestamp: number
    clientId: string
  }
}

const publishLocation = async ({ payload }: PublishLocationProps) => {
  const { kafka } = kafkaConfig()

  const topic = 'location'

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

export default publishLocation
