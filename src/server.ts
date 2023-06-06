import app from './app'

// consumers
import locationConsumer from './consumers/location'
import locationStorageConsumer from './consumers/location-storage'
import connectMongoDB from './mongodb-database'

const port = process.env.PORT || 3001
const environment = process.env.ENVIRONMENT || 'development'

app.listen(port, async () => {
  console.log(`We are live on ${port}`)
  console.log(`Environment: ${environment}`)

  try {
    await connectMongoDB()
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
