import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = (global as any).mongoose || { conn: null, promise: null }

if (!cached.promise) {
  cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => mongoose)
}
cached.conn = cached.promise

const clientPromise = cached.promise

export { clientPromise }
