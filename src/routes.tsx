import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { SignIn } from "./pages/auth/sign-in";
import { AuthLayout } from "./pages/layouts/auth";
import { SignUp } from "./pages/auth/sign-up";
import { AppLayout } from "./pages/layouts/app";
import { OrganizationDashboard } from "./pages/app/organization-dashboard";

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