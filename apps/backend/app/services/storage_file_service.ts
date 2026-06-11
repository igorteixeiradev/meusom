import type { FindMusicValidator } from '#validators/find_music'
import string from '@adonisjs/core/helpers/string'

export class StorageFileService {
  async input(payload: FindMusicValidator): Promise<string> {
    const fileName = `${string.uuid()}.${payload.file.extname}`
    await payload.file.moveToDisk(fileName)
    return `storage/${fileName}`
  }
}
