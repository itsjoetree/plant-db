import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import NavBar, { type NavBarItem } from "../components/NavBar";
import { centeredStyles } from "../styles";
import { Helmet } from "react-helmet";
import { useAtomValue } from "jotai";
import { apiInfoAtom } from "../App";
import { Outlet, useLocation, useMatches, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Logo from "../components/Logo";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFound from "../components/NotFound";

/**
 * General layout of application.
 */
function Layout() {
  const { t } = useTranslation();
  const { species } = useParams();
  const matches = useMatches();
  const location = useLocation();
  const apiInfo = useAtomValue(apiInfoAtom);

  const navItems: NavBarItem[] | undefined = apiInfo?.map(ai => {
    return {
      text: t(ai.path + ".plural"),
      to: "/" + ai.path
    };
  });

  const handle = matches?.find(m => m.pathname === location.pathname)?.handle as { hideNav: boolean };
  console.log(handle);

  return (
    <>
      <Helmet>
        <title>{t("title", { page: t(species?.toLocaleLowerCase() + ".plural", "") })}</title>
      </Helmet>

      {!handle?.hideNav && <NavBar
        logo={<Logo />}
        items={navItems ?? []}
      />}

      <ErrorBoundary key={location.pathname} fallback={<NotFound />}>
        <Suspense fallback={<div className={centeredStyles}>
          <Loading />
        </div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default Layout;