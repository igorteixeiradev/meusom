import { findMusicValidator } from '#validators/find_music'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { FindMusicService } from '#services/find_music_service'
import { StorageFileService } from '#services/storage_file_service'
import MusicTransformer from '#transformers/music_transformer'

@inject()
export default class FindController {
  constructor(
    protected findMusicService: FindMusicService,
    protected storageFileService: StorageFileService
  ) {}

  async store({ request, serialize, response }: HttpContext) {
    const payload = await request.validateUsing(findMusicValidator)
    const file = await this.storageFileService.input(payload)
    const result = await this.findMusicService.input(file)

    if (!result) return response.notFound()

    return serialize(MusicTransformer.transform(result))
  }
}
