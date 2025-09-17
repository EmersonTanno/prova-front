import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ComodosPage from "./pages/ComodosPage.tsx";
import ImovelPage from "./pages/imovelPage.tsx";
import EditImovelPage from "./pages/EditImovelPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/comodos",
    element: <ComodosPage />,
  },
  {
    path: "/imovel",
    element: <ImovelPage />,
  },
  {
    path: "/edit",
    element: <EditImovelPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
