import { User } from "@app/api/prisma/client";
import {
  ActionIcon,
  CloseButton,
  Divider,
  Group,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";
import { format } from "date-fns";

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
          <Table>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Created At</Table.Td>
                <Table.Td>
                  {format(user.createdAt, "yyyy/MM/dd hh:mm:ss")}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Updated At</Table.Td>
                <Table.Td>
                  {format(user.updatedAt, "yyyy/MM/dd hh:mm:ss")}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <Divider />
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
