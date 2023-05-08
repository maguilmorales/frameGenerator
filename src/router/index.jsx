import { createBrowserRouter } from "react-router-dom";
import { FrameGeneratorPage } from "../pages/FrameGeneratorPage";
import { SalesPage } from "../pages/SalesPage";
import { TypographyPage } from "../pages/TypographyPage";
import { AiCommunicationPage } from "../pages/AiCommunicationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrameGeneratorPage />,
  },
  {
    path: "/sales",
    element: <SalesPage />,
  },
  {
    path: "/frame",
    element: <FrameGeneratorPage />
  },
  {
    path: "/typography",
    element: <TypographyPage />
  },
  {
    path: "/communication",
    element: <AiCommunicationPage />
  }
]);

export default router;
