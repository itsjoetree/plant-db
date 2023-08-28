import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { useTranslation } from "react-i18next";
import { type TitleText } from "../types";
import { MoodSad } from "tabler-icons-react";
import { Helmet } from "react-helmet";
import Container from "./Container";

function NotFound() {
  const { t } = useTranslation();
  const notFound: TitleText = t("notFound", { returnObjects: true });

  return (<>
    <Helmet>
      <title>{t("title", { ns: "app", page: notFound.title})}</title>
    </Helmet>
    <Container className={vstack()}>
      <MoodSad size={100} />
      <h1 className={css({
        fontSize: "4xl",
        fontWeight: "bold"
      })}>{notFound.title}</h1>
      <p>{notFound.text}</p>
    </Container>
  </>);
}

export default NotFound;