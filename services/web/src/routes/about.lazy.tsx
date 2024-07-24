import { AppShell } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <>
      <AppShell.Main>About</AppShell.Main>
    </>
  );
}
