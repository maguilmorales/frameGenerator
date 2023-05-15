import { createBrowserRouter } from "react-router-dom";
import { FrameGeneratorPage } from "../pages/FrameGeneratorPage";
import { SalesPage } from "../pages/SalesPage";
import { TypographyPage } from "../pages/TypographyPage";
import { AiInnovationsPage } from "../pages/AiInnovationsPage";
import { AiCustomersPage } from "../pages/AiCustomersPage";
import { GoodAiPage } from "../pages/GoodAiPage";
import { GoodAi2Page } from "../pages/GoodAi2Page";
import { GlassFramesPage } from "../pages/GlassFramesPage";

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
    path: "/innovations",
    element: <AiInnovationsPage />
  },
  {
    path: "/customers",
    element: <AiCustomersPage />
  },
  {
    path: "/goodai",
    element: <GoodAiPage />
  },
  {
    path: "/goodai2",
    element: <GoodAi2Page />
  },
  {
    path: "/glassframes",
    element: <GlassFramesPage />
  }
]);

export default router;
