import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Auth signup', (group) => {
  group.each.setup(() => {
    return testUtils.db().truncate()
  })
  test('return error when required fields are not provided', async ({ client }) => {
    const response = await client.visit('auth.access_tokens.store')

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'The email field must be defined',
          rule: 'required',
        },
        {
          field: 'password',
          message: 'The password field must be defined',
          rule: 'required',
        },
      ],
    })
  })

  test('return error when email not exists', async ({ client }) => {
    const response = await client.visit('auth.access_tokens.store').json({
      email: 'johndoe@example.com',
      password: 'password@321',
    })

    response.assertStatus(400)
    response.assertBodyContains({
      errors: [{ message: 'Invalid user credentials' }],
    })
  })

  test('generate token when credentials are valid', async ({ client }) => {
    const password = 'password@321'
    const user = await UserFactory.merge({ password }).create()

    const response = await client.visit('auth.access_tokens.store').json({
      email: user.email,
      password: password,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        user: response.body().data.user,
        token: response.body().data.token,
      },
    })
  })
})
