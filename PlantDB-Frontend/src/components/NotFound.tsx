import { css } from "../../styled-system/css";
import { useTranslation } from "react-i18next";
import { type TitleText } from "../types";
import { MoodSad } from "tabler-icons-react";
import { Helmet } from "react-helmet";

const styles = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const heading = css({
  fontSize: "md",
  fontWeight: "bold"
});

function NotFound() {
  const { t } = useTranslation();
  const notFound: TitleText = t("notFound", { returnObjects: true });

  return (<>
    <Helmet>
      <title>{t("title", { ns: "app", page: notFound.title})}</title>
    </Helmet>
    <div className={styles}>
      <MoodSad size={100} />
      <h1 className={heading}>{notFound.title}</h1>
      <p>{notFound.text}</p>
    </div>
  </>);
}

export default NotFound;