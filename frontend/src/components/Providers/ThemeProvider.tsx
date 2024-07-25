"use client";

import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "next-themes";

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} position="top-right" />;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <ToasterProvider />
      {children}
    </ThemeProvider>
  );
}
