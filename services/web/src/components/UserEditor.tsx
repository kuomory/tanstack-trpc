import { User } from "@app/api/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Group,
  Stack,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../utils/trpc";
import { useCallback } from "react";
import { IconCheck, IconCancel, IconTrash } from "@tabler/icons-react";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  bio: z.string().nullable(),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  user: User;
  back: () => void;
  onDelete: () => void;
};

export default function UserEditor(props: Props) {
  const { user, back, onDelete } = props;
  const utils = trpc.useUtils();
  const userUpdater = trpc.users.updateUser.useMutation({
    onSuccess: () => {
      utils.users.getUsers.invalidate();
      utils.invalidate(undefined, { queryKey: [user.id] });
      back();
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
      name: user?.name ?? "",
      bio: user?.bio ?? "",
    },
    resolver: zodResolver(formSchema),
  });
  const onValid: SubmitHandler<FormSchema> = useCallback(
    (values) => {
      userUpdater.mutate({
        id: user.id,
        name: values.name,
        bio: values.bio,
      });
    },
    [user.id, userUpdater]
  );
  return (
    <>
      <Stack component="form" onSubmit={handleSubmit(onValid)}>
        <Stack gap={4}>
          <TextInput
            {...register("name")}
            error={errors.name?.message}
            label="name"
          />
          <Textarea
            {...register("bio")}
            error={errors.bio?.message}
            label="bio"
          />
        </Stack>
        <Group>
          <Tooltip label="Done">
            <ActionIcon variant="tertiary" type="submit">
              <IconCheck />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Cancel">
            <ActionIcon variant="tertiary" onClick={back}>
              <IconCancel />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon variant="danger-outline" onClick={onDelete}>
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    </>
  );
}
