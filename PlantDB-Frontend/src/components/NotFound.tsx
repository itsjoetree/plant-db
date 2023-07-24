import { css } from "../../styled-system/css";
import { useTranslation } from "react-i18next";
import { type TitleText } from "../types";
import { MoodSad } from "tabler-icons-react";
import { Helmet } from "react-helmet";
import { vstack } from "../../styled-system/patterns";

function NotFound() {
  const { t } = useTranslation();
  const notFound: TitleText = t("notFound", { returnObjects: true });

  return (<>
    <Helmet>
      <title>{t("title", { ns: "app", page: notFound.title})}</title>
    </Helmet>
    <div className={vstack()}>
      <MoodSad size={100} />
      <h1 className={css({
        fontSize: "4xl",
        fontWeight: "bold"
      })}>{notFound.title}</h1>
      <p>{notFound.text}</p>
    </div>
  </>);
}

export default NotFound;