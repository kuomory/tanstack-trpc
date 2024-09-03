// @vitest-environment jsdom
import "@testing-library/jest-dom";
import { vi } from "vitest";

global.matchMedia =
  global.matchMedia ||
  function (query) {
    return {
      matches: false,
      onchange: null,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  };
