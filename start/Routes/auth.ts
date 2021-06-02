import Route from '@ioc:Adonis/Core/Route'

Route.resource('auth', 'Auth/Main')
  .only(['store', 'destroy'])
  .middleware({ destroy: ['auth'] })
