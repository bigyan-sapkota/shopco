import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import "./index.css";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient } from "@tanstack/react-query";
import QueryProvider from "./providers/query-provider.jsx";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
