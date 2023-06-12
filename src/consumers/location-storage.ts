import kafkaConfig from '@/config/kafka'
import locationModel from '@/models/location'

type Payload = {
  message: {
    value: string
  }
}

const locationStorageConsumer = async () => {
  const { kafka } = kafkaConfig()

  const consumer = kafka.consumer({
    groupId: 'location-storage-group'
  })

  await consumer.connect()
  await consumer.subscribe({ topic: 'location-storage' })

  await consumer.run({
    eachMessage: async ({ message }: Payload) => {
      if (!message.value) return

      const locationStorage = await JSON.parse(message.value)

      console.log({ locationStorage })

      const location = await locationModel.findOne({ ip: locationStorage.ip })

      if (!location) {
        await locationModel.create(locationStorage)
      }

      await locationModel.updateOne({ ip: locationStorage.ip }, locationStorage)
    }
  })
  
  process.on('SIGTERM', async () => {
    await consumer.disconnect()

    process.exit(0)
  })
}

export default locationStorageConsumer
