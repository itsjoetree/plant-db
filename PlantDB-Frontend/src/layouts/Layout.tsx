import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import NavBar, { type NavBarItem } from "../components/NavBar";
import { centeredStyles } from "../styles";
import { Helmet } from "react-helmet";
import { useAtomValue } from "jotai";
import { apiInfoAtom } from "../App";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Logo from "../components/Logo";
import LayoutBody from "./LayoutBody";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFound from "../components/NotFound";

/**
 * General layout of application.
 */
function Layout() {
  const { t } = useTranslation();
  const { species } = useParams();
  const location = useLocation();
  const apiInfo = useAtomValue(apiInfoAtom);

  const navItems: NavBarItem[] | undefined = apiInfo?.map(ai => {
    return {
      text: t(ai.path + ".plural"),
      to: "/" + ai.path
    };
  });

  return (
    <>
      <Helmet>
        <title>{t("title", { page: t(species?.toLocaleLowerCase() + ".plural", "") })}</title>
      </Helmet>

      <NavBar
        logo={<Logo />}
        items={navItems ?? []}
      />

      <LayoutBody>
        <ErrorBoundary key={location.pathname} fallback={<NotFound />}>
          <Suspense fallback={<div className={centeredStyles}>
            <Loading />
          </div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </LayoutBody>
    </>
  );
}

export default Layout;