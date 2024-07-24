import {
  Button,
  CloseButton,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { trpc } from "../utils/trpc";
import { useState } from "react";

export function Test() {
  const utils = trpc.useUtils();
  const userQuery = trpc.getUsers.useQuery();
  const userCreator = trpc.createUser.useMutation({
    onSuccess: () => {
      utils.getUsers.invalidate();
    },
  });
  const userDeleter = trpc.deleteUser.useMutation({
    onSuccess: () => {
      utils.getUsers.invalidate();
    },
  });
  const users = userQuery.data ?? null;
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  return (
    <Container>
      <Stack>
        <Title>Test</Title>
        {users
          ? Object.keys(users).map((key) => (
              <Paper key={key} shadow="xs" p="xs">
                <Group gap="xs" justify="space-between">
                  <Stack gap={4}>
                    <Title order={2}>{users[key].name}</Title>
                    <Text>{users[key].bio}</Text>
                  </Stack>
                  <CloseButton
                    onClick={() => {
                      userDeleter.mutate(users[key].name);
                    }}
                  />
                </Group>
              </Paper>
            ))
          : "No User"}
        <Stack gap="xs" align="flex-start">
          <TextInput
            label="name"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          <TextInput
            label="bio"
            value={bio}
            onChange={(e) => {
              setBio(e.currentTarget.value);
            }}
          />
          <Button
            onClick={() => {
              userCreator.mutate({ name, bio: bio ?? undefined });
              setName("");
              setBio("");
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
