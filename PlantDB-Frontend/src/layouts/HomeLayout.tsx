import { Suspense, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import NavBar, { type NavBarItem } from "../components/NavBar";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { apiInfoAtom } from "../App";
import Logo from "../components/Logo";
import LayoutBody from "./LayoutBody";

type HomeLayoutProps = {
  hero: ReactNode;
}

/**
 * Home page layout of application.
 */
function HomeLayout({ hero }: HomeLayoutProps) {
  const { t } = useTranslation("home");
  const apiInfo = useAtomValue(apiInfoAtom);

  const navItems: NavBarItem[] | undefined = apiInfo?.map(ai => {
    return {
      text: t(ai.path + ".plural"),
      to: ai.path
    };
  });

  return (
    <>
      <Helmet>
        <title>{t("title", { ns: "app", page: t("title") })}</title>
      </Helmet>

      <NavBar
        logo={<Logo />}
        items={navItems ?? []}
      />

      {hero}

      <LayoutBody>
        <Suspense fallback="">
          <Outlet />
        </Suspense>
      </LayoutBody>
    </>
  );
}

export default HomeLayout;