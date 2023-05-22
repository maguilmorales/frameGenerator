import { createBrowserRouter } from "react-router-dom";
import { FrameGeneratorPage } from "../pages/FrameGeneratorPage";
import { SalesPage } from "../pages/SalesPage";
import { TypographyPage } from "../pages/TypographyPage";
import { AiInnovationsPage } from "../pages/AiInnovationsPage";
import { AiCustomersPage } from "../pages/AiCustomersPage";
import { GoodAiPage } from "../pages/GoodAiPage";
import { EmotionalSupportPage } from "../pages/EmotionalSupportPage";
import { GlassFramesPage } from "../pages/GlassFramesPage";
import { AiWhispererPage } from "../pages/AiWhispererPage";
import { StackPage } from "../pages/StackPage";

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
    path: "/emotionalsupport",
    element: <EmotionalSupportPage />
  },
  {
    path: "/glassframes",
    element: <GlassFramesPage />
  },
  {
    path: "/aiwhisperer",
    element: <AiWhispererPage />
  },
  {
    path: "/stack",
    element: <StackPage />
  }
]);

export default router;
