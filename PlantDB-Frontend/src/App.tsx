import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, useEffect } from "react";
import type { PlantApiInfo } from "./types";
import { atom, useSetAtom } from "jotai";
import { useQuery } from "react-query";
import NotFound from "./components/NotFound";
import HomeLayout from "./layouts/HomeLayout";
import Hero from "./sections/home/Hero";
import Layout from "./layouts/Layout";

const Home   =   lazy(() => import("./sections/home"));
const Entries =  lazy(() => import("./sections/entries"));

export const apiInfoAtom = atom<PlantApiInfo[] | null>(null);

function App() {
  const setApiInfo = useSetAtom(apiInfoAtom);

  const { data } = useQuery("app-info", async () : Promise<PlantApiInfo[]> => {
    const response = await fetch("/api/app-info");
    const data = await response.json();
    return data;
  });

  useEffect(() => { if (data) setApiInfo(data); }, [data]);

  const routes = [
    {
      path: "/:species",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Entries />
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