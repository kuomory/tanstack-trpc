import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { trpc, trpcClient } from "../utils/trpc";
import {
  ActionIcon,
  AppShell,
  CloseButton,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { getQueryKey } from "@trpc/react-query";
import {
  IconCancel,
  IconCheck,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { queryClient } from "../utils/queryClient";
import UserDetails from "../components/UserDetails";
import UserEditor from "../components/UserEditor";

const getUserQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [...getQueryKey(trpc.users.getUserById), userId],
    queryFn: () => trpcClient.users.getUserById.query(userId),
  });

export const Route = createFileRoute("/users/$userId")({
  component: Page,
  loader: ({ params: { userId } }) =>
    queryClient.ensureQueryData(getUserQueryOptions(userId)),
});

function Page() {
  const { userId } = Route.useParams();
  const router = useRouter();
  const utils = trpc.useUtils();
  const userData = useSuspenseQuery(getUserQueryOptions(userId));
  const user = userData.data;
  const userDeleter = trpc.users.deleteUser.useMutation({
    onSuccess: () => {
      router.navigate({ to: "/users" });
      utils.users.getUsers.invalidate();
    },
  });

  const [isEditing, { open: edit, close: back }] = useDisclosure(false);
  if (!user) {
    redirect({ to: "/users" });
    return null;
  }

  const handleDelete = useCallback(() => {
    userDeleter.mutate(user.id);
  }, [userDeleter, user.id]);

  return (
    <>
      <AppShell.Aside p="md">
        {isEditing ? (
          <UserEditor
            key={userId}
            user={user}
            back={back}
            onDelete={handleDelete}
          />
        ) : (
          <UserDetails user={user} edit={edit} onDelete={handleDelete} />
        )}
      </AppShell.Aside>
    </>
  );
}
