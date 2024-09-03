import { expect, test } from "vitest";
import { createUser } from "../../src/routers/users/createUser";
import { updateUser } from "../../src/routers/users/updateUser";
import { deleteUser } from "../../src/routers/users/deleteUser";
import { testRoute } from "../utils/testRoute";

test("ユーザー追加・更新・削除", async () => {
  const response1 = await testRoute(createUser).run({
    name: "Charlie",
    bio: "I'm a professional!",
  });
  expect(response1).toMatchObject({
    name: "Charlie",
    bio: "I'm a professional!",
  });
  const response2 = await testRoute(updateUser).run({
    id: response1.id,
    name: "Charlie",
    bio: "I'm a manager!",
  });
  expect(response2).toMatchObject({
    name: "Charlie",
    bio: "I'm a manager!",
  });
  const response3 = await testRoute(deleteUser).run(response1.id);
  expect(response3).toMatchObject({
    name: "Charlie",
    bio: "I'm a manager!",
  });
});
