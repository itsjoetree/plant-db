import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import type { PlantApiInfo } from "./types";
import { atom, useSetAtom } from "jotai";
import { useQuery } from "react-query";
import { ToastProvider } from "./components/Toast";
import { useTranslation } from "react-i18next";
import EntriesDashSkeleton from "./sections/entries/dashboard/Skeleton";
import EntryEditSkeleton from "./sections/entries/edit/Skeleton";
import EntryAddSkeleton from "./sections/entries/add/Skeleton";
import NotFound from "./components/NotFound";
import Layout from "./layouts/Layout";
import Offline from "./components/Offline";

const Home      =   lazy(() => import("./sections/home"));
const Entries   =   lazy(() => import("./sections/entries"));
const Add       =   lazy(() => import("./sections/entries/add"));
const Edit       =   lazy(() => import("./sections/entries/edit"));
const Dashboard =   lazy(() => import("./sections/entries/dashboard"));

export const apiInfoAtom = atom<PlantApiInfo[] | null>(null);

function App() {
  const { t } = useTranslation();
  const setApiInfo = useSetAtom(apiInfoAtom);

  const { data, isError, isLoading } = useQuery("app-info", async () : Promise<PlantApiInfo[]> => {
    const response = await fetch("/api/app-info");
    const data = await response.json();
    return data;
  });

  useEffect(() => {
    data && setApiInfo(data);
  }, [data, setApiInfo]);

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

  if (isError) return (<Offline />);
  else if (isLoading) return;

  const router = createBrowserRouter(routes);
  return (<ToastProvider timeoutAfterMs={5000} aria-label-close={t("close")}>
    <RouterProvider router={router} />
  </ToastProvider>);
}

export default App;