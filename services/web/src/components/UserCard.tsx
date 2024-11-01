import { Paper, Stack, Box, Title, Text, Group } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { User } from "../../../api/prisma/client";
import { formatDistance } from "date-fns";

type Props = {
  user: User;
  active?: boolean;
};

export function UserCard(props: Props) {
  const { user, active = false } = props;
  const { id, name, bio, updatedAt } = user;
  //                     ^?
  // パースしなくてもDate型になっている
  return (
    <Paper
      shadow="md"
      bg={active ? "var(--mantine-primary-color-1)" : undefined}
    >
      <Stack gap={4}>
        <Link to={`/users/${id}`} style={{ textDecoration: "none" }}>
          <Box px="lg" py="xs">
            <Group justify="space-between">
              <Title order={2} c="dark" fw="normal">
                {name}
              </Title>
              <Text c="dimmed" size="sm">
                {formatDistance(updatedAt, new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </Text>
            </Group>
            <Text c="dark">{bio}</Text>
          </Box>
        </Link>
      </Stack>
    </Paper>
  );
}
