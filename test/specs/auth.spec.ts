import test from "japa";
import { request } from "Test/utils";
import { UserFactory } from "Database/factories";
import Database from "@ioc:Adonis/Lucid/Database";
import faker from "faker";

test.group("/auth", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test("[store] - should able to authenticate with valid credentials", async (assert) => {
    // arrange
    const user = await UserFactory.merge({ password: "secret" }).create();

    // action
    const { body } = await request
      .post("/auth")
      .send({ email: user.email, password: "secret" })
      .expect(200);

    // assert
    assert.exists(body.token);
  });

  test("[store] - should fail to authenticate with invalid credentials", async () => {
    await request
      .post("/auth")
      .send({ email: faker.internet.email(), password: "secret" })
      .expect(400);
  });

  test("[destroy] - should able to delete token after logout", async (assert) => {
    const user = await UserFactory.merge({ password: "secret" }).create();

    const { body } = await request
      .post("/auth")
      .send({ email: user.email, password: "secret" })
      .expect(200);

    await request
      .delete("/auth")
      .set("authorization", `bearer ${body.token}`)
      .expect(200);

    const token = await Database.from("api_tokens")
      .where({ user_id: user.id })
      .first();

    assert.isNull(token);
  });
});
