import { expect, test } from "vitest";
import { getUsers } from "../../src/routers/users/getUsers";
import { getUserById } from "../../src/routers/users/getUserById";
import { testRoute } from "../utils/testRoute";

test("ユーザー取得", async () => {
  const response1 = await testRoute(getUsers).run();
  expect(response1[0]).toMatchObject({
    name: "Alice",
    bio: "I'm a designer!",
  });
  expect(response1[1]).toMatchObject({
    name: "Bob",
    bio: "I'm a programmer!",
  });
  const response2 = await testRoute(getUserById).run(response1[0].id);
  expect(response2).toMatchObject({
    name: "Alice",
    bio: "I'm a designer!",
  });
});
