import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Auth signup', (group) => {
  group.each.setup(() => {
    return testUtils.db().truncate()
  })
  test('return error when required fields are not provided', async ({ client }) => {
    const response = await client.visit('auth.new_account.store')

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'fullName',
          message: 'The fullName field must be defined',
          rule: 'required',
        },
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
        {
          field: 'passwordConfirmation',
          message: 'The passwordConfirmation field must be defined',
          rule: 'required',
        },
      ],
    })
  })

  test('return error when create new account with diferent password', async ({ client }) => {
    const response = await client.visit('auth.new_account.store').json({
      email: 'johndoe@example.com',
      fullName: 'John Doe',
      password: 'password@321',
      passwordConfirmation: 'password@3210',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'The passwordConfirmation field and password field must be the same',
          rule: 'sameAs',
          field: 'passwordConfirmation',
        },
      ],
    })
  })

  test('return error when create new account with existing email', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.visit('auth.new_account.store').json({
      email: user.email,
      fullName: 'John Doe',
      password: 'password@321',
      passwordConfirmation: 'password@321',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'The email has already been taken',
          rule: 'database.unique',
          field: 'email',
        },
      ],
    })
  })
})
