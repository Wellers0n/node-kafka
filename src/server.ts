import app from './app'

// consumers
import locationConsumer from './consumers/location'
import locationStorageConsumer from './consumers/location-storage'
import connectMongoDB from './mongodb-database'

const PORT = process.env.PORT || 3001
const ENVIRONMENT = process.env.ENVIRONMENT || 'development'

app.listen(PORT, async () => {
  console.log(`We are live on ${PORT}`)
  console.log(`Environment: ${ENVIRONMENT}`)

  try {
    ENVIRONMENT !== 'test' && (await connectMongoDB())
    console.log('Database connected with success!')
  } catch (error) {
    console.log('Could not connect to database', { error })
    throw error
  }

  locationConsumer().catch(e =>
    console.error(`[location/consumer] ${e.message}`, e)
  )

  locationStorageConsumer().catch(e =>
    console.error(`[location/consumer] ${e.message}`, e)
  )
})
