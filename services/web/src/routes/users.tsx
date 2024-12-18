import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AppShell, Button, Container, Stack } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { getQueryKey } from "@trpc/react-query";
import { UserCard } from "../components/UserCard";
import { trpc, trpcClient } from "../utils/trpc";
import { queryClient } from "../utils/queryClient";

const usersQueryOptions = queryOptions({
  queryKey: getQueryKey(trpc.users.getUsers),
  queryFn: () => trpcClient.users.getUsers.query(),
});

export const Route = createFileRoute("/users")({
  loader: () => queryClient.ensureQueryData(usersQueryOptions),
  component: Page,
});

function Page() {
  const usersData = useSuspenseQuery(usersQueryOptions);
  const users = usersData.data;
  const location = useLocation();

  return (
    <>
      <AppShell.Main>
        <Container>
          <Stack>
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                active={location.pathname.includes(user.id)}
              />
            ))}
            <Link to="/users/new" style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="tertiary"
                leftSection={<IconUserPlus />}
                fullWidth
              >
                Create User
              </Button>
            </Link>
          </Stack>
        </Container>
      </AppShell.Main>
      <Outlet />
    </>
  );
}
