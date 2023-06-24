import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import NotFound from "./components/NotFound";
import HomeLayout from "./layouts/HomeLayout";
import Hero from "./sections/home/Hero";
import Layout from "./layouts/Layout";

const Home   =   lazy(() => import("./sections/home"));
const Search =   lazy(() => import("./sections/search"));

function App() {
  const routes = [
    {
      path: "/:plant",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Search />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
    {
      path: "/",
      element: <HomeLayout hero={<Hero />} />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ],
    }
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;