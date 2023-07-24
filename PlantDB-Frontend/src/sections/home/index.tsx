import { useTranslation } from "react-i18next";
import type { TitleText } from "../../types";
import { css } from "../../../styled-system/css";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import type { NavBarItem } from "../../components/NavBar";
import { useAtomValue } from "jotai";
import { apiInfoAtom } from "../../App";
import { Helmet } from "react-helmet";
import NavBar from "../../components/NavBar";
import Logo from "../../components/Logo";
import Hero from "./Hero";
import Container from "../../components/Container";

/**
 * Landing page of application.
 */
function Home() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const apiInfo = useAtomValue(apiInfoAtom);
  const fern: TitleText = t("ferns", { returnObjects: true });
  const cactus: TitleText = t("cacti", { returnObjects: true });

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
          [fern, cactus].map(info => <Card
            key={info.title}
            onClick={() => navigate("/" + info.title.toLocaleLowerCase())}
            className={css({
              maxWidth: "30rem",
              cursor: "pointer",
              _hover: {
                backgroundColor: "secondary",
                color: "primary"
              }
            })}
          >
            <h1 className={css({ fontSize: "4xl" })}>{info.title}</h1>
            <p>{info.text}</p>
          </Card>)
        }
      </div>
    </Container>
  </>);
}

export default Home;