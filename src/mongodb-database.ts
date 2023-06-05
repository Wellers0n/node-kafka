import mongoose from 'mongoose'

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/node-kafka'

export default function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('MongoDB connection closed.'))
      .once('open', () => {
        console.log('MongoDB connection successful')
        return resolve(mongoose.connections[0])
      })

    mongoose.connect(uri)
  })
}
