import type { PlantApiInfo } from "../../types";
import {  useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { useSetAtom } from "jotai";
import { apiInfoAtom } from "./Layout";

/**
 * Renders outlet component to be used in router and sets global API info
 */
export function LayoutOutlet() {
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