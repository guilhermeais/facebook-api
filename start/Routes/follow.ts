import Route from '@ioc:Adonis/Core/Route'

Route.post('/follow', 'Follows/Follow.store').middleware('auth')
Route.post('/unfollow', 'Follows/UnFollow.store').middleware('auth')

Route.get('/following', 'Follows/Following.index').middleware('auth')
