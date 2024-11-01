import {
  AppShell,
  Button,
  Divider,
  Group,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { IconCancel, IconUserPlus } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { trpc } from "../utils/trpc";

export const Route = createFileRoute("/users/new")({
  component: Page,
});

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  bio: z.string().nullable(),
});
type FormSchema = z.infer<typeof formSchema>;

function Page() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const userCreator = trpc.users.createUser.useMutation({
    onSuccess: (data) => {
      utils.users.getUsers.invalidate();
      router.navigate({ to: `/users/${data.id}` });
    },
    onError: (error) => {
      const errorData = JSON.parse(error.message);
      alert(errorData.map((err: Error) => err.message));
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      name: "",
      bio: "",
    },
    resolver: zodResolver(formSchema),
  });
  const onValid: SubmitHandler<FormSchema> = useCallback(
    (values) => {
      userCreator.mutate({
        name: values.name,
        bio: values.bio,
      });
    },
    [userCreator]
  );
  return (
    <>
      <AppShell.Aside p="md">
        <Title order={2} fw="normal">
          Create new user
        </Title>
        <Divider my="md" />
        <Stack component="form" onSubmit={handleSubmit(onValid)}>
          <Stack gap={4}>
            <TextInput
              {...register("name")}
              label="name"
              error={errors.name?.message}
            />
            <Textarea
              {...register("bio")}
              label="bio"
              error={errors.bio?.message}
            />
          </Stack>
          <Group justify="flex-end">
            <Button
              type="button"
              variant="secondary"
              leftSection={<IconCancel />}
              onClick={() => {
                router.navigate({ to: "/" });
              }}
            >
              Cancel
            </Button>
            <Button type="submit" leftSection={<IconUserPlus />}>
              Create
            </Button>
          </Group>
        </Stack>
      </AppShell.Aside>
    </>
  );
}
