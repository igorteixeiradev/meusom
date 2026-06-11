import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { join } from 'node:path'

test.group('Songs find', (group) => {
  group.each.setup(() => {
    return testUtils.db().truncate()
  })
  test('return error when required fields are not provided', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.visit('songs.find.store').withGuard('api').loginAs(user)

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'The file field must be defined',
          rule: 'required',
          field: 'file',
        },
      ],
    })
  })

  test('upload file and return song', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client
      .visit('songs.find.store')
      .withGuard('api')
      .loginAs(user)
      .file('file', join('tests', 'static', 'music.m4a'))

    console.log(response.body())
    response.assertStatus(200)
    response.assertBodyContains({
      data: response.body().data,
    })
  })
})
