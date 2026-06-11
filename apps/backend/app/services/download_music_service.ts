import { ytdl } from 'ytdl-plus'
export class DownloadMusicService {
  async input(payload: string) {
    try {
      const results = await ytdl.search(payload)
      if (results.length === 0) throw new Error('No results found')
      const { url, title } = results[0]
      await ytdl.downloadAudio(url, {
        format: 'm4a',
        outputDir: './audio',
        quality: 'highestaudio',
        filename: `${title}`,
        overwrite: true,
      })
    } catch (error) {
      throw error
    }
  }
}
