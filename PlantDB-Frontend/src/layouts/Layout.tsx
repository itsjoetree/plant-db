import { type PropsWithChildren, Suspense } from "react";
import { Link } from "react-router-dom";
import type { PlantApiInfo } from "../../types";
import { atom } from "jotai";
import { useTranslation } from "react-i18next";
import { css } from "../../styled-system/css";
import NavBar, { type NavBarItem } from "../components/NavBar";
import { LayoutOutlet } from "./LayoutOutlet";

export const apiInfoAtom = atom<PlantApiInfo[] | null>(null);

export const logoStyles = css({
  fontSize: "1.5rem",
  fontWeight: "bold"
});

/**
 * Shell of the application
 */
function Layout() {
  const { t } = useTranslation();
  const navItems: NavBarItem[] = t("navItems", { returnObjects: true});

  return (
    <>
      <NavBar
        logo={<Link to="/" className={logoStyles}>{t("name")}</Link>}
        items={navItems}
      />

      <Suspense fallback={<span>Loading...</span>}>
        <LayoutBody>
          <LayoutOutlet />
        </LayoutBody>
      </Suspense>
    </>
  );
}

export default Layout;

const bodyStyles = css({
  padding: "1rem 0.5rem"
});

function LayoutBody ({ children } : PropsWithChildren) {

  return (<div className={bodyStyles}>
    {children}
  </div>);
}