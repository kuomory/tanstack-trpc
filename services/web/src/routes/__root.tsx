import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logo } from "../components/Logo";
import { Navbar } from "../components/Navbar";
import { TanStackRouterDevtools } from "../components/TanStackRouterDevtools";
import { Providers } from "../providers";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <Providers>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        aside={{
          width: "30%",
          breakpoint: "md",
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo />
            </Link>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar />
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </AppShell.Navbar>
        <Outlet />
      </AppShell>
    </Providers>
  );
}
