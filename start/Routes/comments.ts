import Route from '@ioc:Adonis/Core/Route'

Route.resource('/comments', 'Comments/Main')
  .apiOnly()
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
