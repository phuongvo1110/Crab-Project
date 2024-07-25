"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryclient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
