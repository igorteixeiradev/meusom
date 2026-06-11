import { BaseTransformer } from '@adonisjs/core/transformers'

interface ShazamTrack {
  key: string
  title: string
  subtitle: string
  images: {
    coverart: string
    coverarthq: string
    background: string
    joecolor: string
  }
  share: {
    subject: string
    text: string
    href: string
    image: string
    twitter: string
    html: string
    avatar?: string
    snapchat?: string
  }
}

export default class MusicTransformer extends BaseTransformer<ShazamTrack> {
  toObject() {
    return this.pick(this.resource, ['key', 'title', 'subtitle', 'images', 'share', 'type'])
  }

  forMobileList() {
    return {
      id: this.resource.key,
      title: this.resource.title,
      artist: this.resource.subtitle,
      cover: this.resource.images.coverarthq,
    }
  }
}
