import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './users'
import './uploads'
import './posts'
import './comments'
import './reactions'
import './follow'
import './profiles'
import './messages'
import './conversations'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/verify-email')
})

Route.on('/test').render('test')
Route.on('/chat').render('chat')
