import { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import type { PlantApiInfo } from "../types";
import { atom, useSetAtom } from "jotai";

export const apiInfoAtom = atom<PlantApiInfo[] | null>(null);

/**
 * Shell of the application
 */
function Layout() {

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <LayoutOutlet />
    </Suspense>
  );
}

function LayoutOutlet() {
  const setApiInfo = useSetAtom(apiInfoAtom);

  const { data } = useQuery("app-info", async () : Promise<PlantApiInfo[]> => {
    const response = await fetch("/api/app-info");
    const data = await response.json();
    return data;
  }, {
    suspense: true
  });

  useEffect(() => {
    if (data) setApiInfo(data);
  }, [data, setApiInfo]);

  return <Outlet />;
}

export default Layout;