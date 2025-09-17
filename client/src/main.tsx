// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import store from "./app/store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Theme appearance="dark">
    <Provider store={store}>
      <App />
    </Provider>
  </Theme>
  // </StrictMode>
);
