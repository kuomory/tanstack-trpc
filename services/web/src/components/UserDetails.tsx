import { User } from "@app/api/prisma/client";
import {
  ActionIcon,
  CloseButton,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";

type Props = {
  user: User;
  edit: () => void;
  onDelete: () => void;
};

export default function UserDetails(props: Props) {
  const { user, edit, onDelete } = props;
  const router = useRouter();
  return (
    <>
      <Stack>
        <Stack gap={4}>
          <Group justify="space-between">
            <Title fw="normal">{user.name}</Title>
            <CloseButton
              onClick={() => {
                router.navigate({ to: "/" });
              }}
            />
          </Group>
          <Text style={{ whiteSpace: "pre-wrap" }}>{user.bio}</Text>
        </Stack>
        <Group>
          <Tooltip label="Edit">
            <ActionIcon variant="tertiary" onClick={edit}>
              <IconEdit />
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
