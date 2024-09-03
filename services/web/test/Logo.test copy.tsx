import { render, screen } from "@testing-library/react";
import { Logo } from "../src/components/Logo";
import { Wrapper } from "./utils/Wrapper";
import { expect, test } from "vitest";

test("ロゴ", async () => {
  render(<Logo />, Wrapper);
  expect(screen.getByText("TanStack")).toBeInTheDocument();
});
