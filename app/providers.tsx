"use client";

import type { ThemeProviderProps } from "next-themes";

import { Toaster } from "sonner";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider locale="pt-BR" navigate={router.push}>
      <SessionProvider>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        <Toaster closeButton richColors />
      </SessionProvider>
    </HeroUIProvider>
  );
}
