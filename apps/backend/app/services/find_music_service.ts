import { Shazam } from 'node-shazam'

export class FindMusicService {
  async input(payload: string) {
    const shazam = new Shazam()
    const result = await shazam.recognise(payload)
    if (!result || !('track' in result) || !result.track) {
      return null
    }

    return result.track
  }
}
