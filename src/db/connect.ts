import * as mongoose from 'mongoose';
import { ITypedEnv } from '@src/utils/env';
import '../model/watchlist';

async function connectDB(env: ITypedEnv) {
  mongoose.set('strictQuery', false)

  try {
    await mongoose.connect(env.mongoUri)
    console.info('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }
}

export default connectDB
