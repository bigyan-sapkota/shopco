import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        gcTime: 3 * 60000,
        refetchIntervalInBackground: false,
        maxPages: 10,
      },
      mutations: {
        retry: false,
        gcTime: 30000,
      },
    },
  });
}

let browserQueryClient;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
