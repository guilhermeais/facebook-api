import test from 'japa'
import { request, generateToken } from 'Test/utils'
import { UserFactory } from 'Database/factories'
import { Post } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'
import faker from 'faker'

test.group('/posts', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('[index] - should able to list posts with username filter', async (assert) => {
    const user = await UserFactory.with('posts', 3, (post) => post.with('media')).create()
    const { token } = await generateToken()

    const { body } = await request
      .get(`/posts?username=${user.username}`)
      .set('authorization', `bearer ${token}`)
      .expect(200)

    assert.lengthOf(body, user.posts.length)
    body.forEach((post: Post) => {
      assert.exists(post.id)
      assert.exists(post.description)
      assert.exists(post.user.name)
      assert.exists(post.user.username)
      assert.exists(post.comments)
      assert.exists(post.commentsCount)
      assert.exists(post.reactionsCount.like)
      assert.exists(post.reactionsCount.love)
      assert.exists(post.reactionsCount.haha)
      assert.exists(post.reactionsCount.sad)
      assert.exists(post.reactionsCount.angry)
    })
  })

  test('[index] - should able to list your own posts when username filter is missing', async (assert) => {})

  // store
  test('[store] - should able to store a post when authenticated', async (assert) => {})

  test('[store] - should fail to store a post when is not authenticated', async (assert) => {})

  // update
  test('[update] - should able to update a post when authenticated', async (assert) => {})

  test('[update] - should fail to update a post when is not authenticated', async (assert) => {})

  test('[update] - should fail to update a post from another user', async (assert) => {})

  // destroy
  test('[destroy] - should able to destroy a post when authenticated', async (assert) => {})

  test('[destroy] - should fail to destroy a post when is not authenticated', async (assert) => {})

  test('[destroy] - should fail to destroy a post from another user', async (assert) => {})
})
