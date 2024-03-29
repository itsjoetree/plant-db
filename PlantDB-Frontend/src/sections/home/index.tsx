import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { css } from "styled-system/css";
import type { NavBarItem } from "@/components/NavBar";
import { useAtomValue } from "jotai";
import { apiInfoAtom } from "@/App";
import { Helmet } from "react-helmet";
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import Logo from "@/components/Logo";
import Container from "@/components/Container";
import Hero from "./Hero";

/**
 * Landing page of application.
 */
function Home() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const apiInfo = useAtomValue(apiInfoAtom);

  const navItems: NavBarItem[] | undefined = apiInfo?.map(ai => {
    return {
      text: t(ai.path + ".plural"),
      to: ai.path
    };
  });

  return (<>
    <Helmet>
      <title>{t("title", { ns: "app", page: t("title") })}</title>
    </Helmet>

    <NavBar
      logo={<Logo />}
      items={navItems ?? []}
    />

    <Hero />

    <Container className={css({ display: "flex", flexDir: "column", gap: "8"})}>
      <h1 className={css({ alignSelf: "center", fontSize: "4xl", fontWeight: "bold" })}>{t("browse")}</h1>
      <div className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "4",
        flexWrap: "wrap"
      })}>
        {

          apiInfo?.map(({ path }) => <Card
            key={path}
            onClick={() => navigate("/" + path)}
            className={css({
              maxWidth: "30rem",
              cursor: "pointer",
              _hover: {
                backgroundColor: "secondary",
                color: "primary"
              }
            })}
          >
            <h1 className={css({ fontSize: "4xl" })}>{t(path + ".title")}</h1>
            <p>{t(path + ".text")}</p>
          </Card>)
        }
      </div>
    </Container>
  </>);
}

export default Home;