import { Schema, model, InferSchemaType } from 'mongoose';

const watchlistSchema = new Schema({
  
})

export type Watchlist = InferSchemaType<typeof watchlistSchema>
export const Watchlist = model('Watchlist', watchlistSchema)