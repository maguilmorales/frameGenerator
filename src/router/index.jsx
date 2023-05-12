import { createBrowserRouter } from "react-router-dom";
import { FrameGeneratorPage } from "../pages/FrameGeneratorPage";
import { SalesPage } from "../pages/SalesPage";
import { TypographyPage } from "../pages/TypographyPage";
import { AiInnovationsPage } from "../pages/AiInnovationsPage";
import { AiCustomersPage } from "../pages/AiCustomersPage";

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
  }
]);

export default router;
