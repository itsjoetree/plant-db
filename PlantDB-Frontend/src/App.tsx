import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import type { PlantApiInfo } from "./types";
import { atom, useSetAtom } from "jotai";
import { useQuery } from "react-query";
import { Skeleton as EntriesDashSkeleton } from "./sections/entries/dashboard";
import { Skeleton as EntryEditSkeleton } from "./sections/entries/edit";
import { Skeleton as EntryAddSkeleton } from "./sections/entries/add";
import NotFound from "./components/NotFound";
import Layout from "./layouts/Layout";
import Edit from "./sections/entries/edit";

const Home      =   lazy(() => import("./sections/home"));
const Entries   =   lazy(() => import("./sections/entries"));
const Add       =   lazy(() => import("./sections/entries/add"));
const Dashboard =   lazy(() => import("./sections/entries/dashboard"));

export const apiInfoAtom = atom<PlantApiInfo[] | null>(null);

function App() {
  const setApiInfo = useSetAtom(apiInfoAtom);

  const { data } = useQuery("app-info", async () : Promise<PlantApiInfo[]> => {
    const response = await fetch("/api/app-info");
    const data = await response.json();
    return data;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          path: "add",
          element: (<Suspense fallback={<EntryAddSkeleton />}>
            <Add />
          </Suspense>),
          handle: {
            hideNav: true
          }
        },
        {
          path: ":id",
          element: (<Suspense fallback={<EntriesDashSkeleton />}>
            <Dashboard />
          </Suspense>),
          handle: {
            hideNav: true
          }
        },
        {
          path: ":id/edit",
          element: (<Suspense fallback={<EntryEditSkeleton />}>
            <Edit />
          </Suspense>),
          handle: {
            hideNav: true
          }
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
    {
      path: "/",
      element: (<Suspense>
        <Home />
      </Suspense>)
    }
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;