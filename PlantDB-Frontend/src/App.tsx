import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "./Layout";

const Home = lazy(() => import("./sections/home"));

function App() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    }
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;