import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const findMusicValidator = vine.create({
  file: vine.file({
    size: '2mb',
    extnames: ['m4a', 'mp3'],
  }),
})

export type FindMusicValidator = Infer<typeof findMusicValidator>
