import { type ReactNode, Suspense } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar, { type NavBarItem } from "../components/NavBar";
import { logoStyles } from "./Layout";
import { LayoutOutlet } from "./LayoutOutlet";

type HomeLayoutProps = {
    hero: ReactNode;
}

function HomeLayout({ hero } : HomeLayoutProps) {
  const { t } = useTranslation();
  const navItems: NavBarItem[] = t("navItems", { returnObjects: true});

  return (
    <>
      <NavBar
        logo={<Link to="/" className={logoStyles}>{t("name")}</Link>}
        items={navItems}
      />
      {hero}

      <Suspense fallback={<span>Loading...</span>}>
        <LayoutOutlet />
      </Suspense>
    </>
  );
}

export default HomeLayout;