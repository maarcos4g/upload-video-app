import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/app/home";
import { SignIn } from "./pages/auth/sign-in";
import { AuthLayout } from "./pages/layouts/auth";
import { SignUp } from "./pages/auth/sign-up";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Layout</h1>,
    children: [
      {
        path: '/',
        element: <Home />
      }
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