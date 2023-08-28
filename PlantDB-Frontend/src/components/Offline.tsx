import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { useTranslation } from "react-i18next";
import { type TitleText } from "../types";
import { PlugOff } from "tabler-icons-react";
import { Helmet } from "react-helmet";
import HeaderBar from "./HeaderBar";
import Logo from "./Logo";
import Container from "./Container";
import Button from "./Button";

/**
 * Provides a fallback page for when the server is offline.
 */
function Offline() {
  const { t } = useTranslation();
  const offline: TitleText = t("offline", { returnObjects: true });

  return (<>
    <Helmet>
      <title>{t("title", { ns: "app", page: offline.title })}</title>
    </Helmet>

    <HeaderBar>
      <Logo noLink />
    </HeaderBar>

    <Container className={vstack()}>
      <PlugOff size={100} />
      <h1 className={css({
        fontSize: "4xl",
        fontWeight: "bold"
      })}>{offline.title}</h1>
      <p>{offline.text}</p>
      <Button onClick={() => window.location.reload()}>{t("reload")}</Button>
    </Container>
  </>);
}

export default Offline;