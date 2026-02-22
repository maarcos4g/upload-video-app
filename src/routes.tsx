import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { SignIn } from "./pages/auth/sign-in";
import { AuthLayout } from "./pages/layouts/auth";
import { SignUp } from "./pages/auth/sign-up";
import { AppLayout } from "./pages/layouts/app";
import { OrganizationDashboard } from "./pages/app/organization-dashboard";
import { NewUpload } from "./pages/app/new-upload";
import { BatchUpdates } from "./pages/app/new-upload/batch-updates";
import { OrganizationSettings } from "./pages/app/organization-settings";
import { EditVideo } from "./pages/app/edit-video";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/org/:slug',
        element: <OrganizationDashboard />
      },
      {
        path: '/org/:slug/upload',
        element: <NewUpload />
      },
      {
        path: '/org/:slug/batch/:batchId',
        element: <BatchUpdates />
      },
      {
        path: '/org/:slug/settings',
        element: <OrganizationSettings />
      },
      {
        path: '/org/:slug/video/:videoId',
        element: <EditVideo />
      },
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
    ]
  },
])