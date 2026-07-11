import { BaseTransformer } from '@adonisjs/core/transformers'
import Song from '#models/song'

export default class SongTransformer extends BaseTransformer<Song> {
  toObject() {
    return this.pick(this.resource, ['id'])
  }
}