"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "../libs/query-client";
import { fetchProfile, profileKey } from "../queries/use-profile";

export default function QueryProvider({ children }) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: profileKey,
    queryFn: fetchProfile,
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
