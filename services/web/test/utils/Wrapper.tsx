import { Providers } from "../../src/providers";

export const WrapperContent: React.JSXElementConstructor<{
  children: React.ReactNode;
}> = ({ children }) => <Providers>{children}</Providers>;

export const Wrapper = { wrapper: WrapperContent };
