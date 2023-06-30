import { useTranslation } from "react-i18next";
import type { TitleText } from "../../types";
import { css } from "../../../styled-system/css";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

/**
 * Landing page of application.
 */
function Home() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const fern: TitleText = t("ferns", { returnObjects: true });
  const cactus: TitleText = t("cacti", { returnObjects: true });

  return (
    <div className={css({ display: "flex", flexDir: "column", gap: "1rem"})}>
      <h1 className={css({ alignSelf: "center", fontSize: "md", fontWeight: "bold" })}>{t("browse")}</h1>
      <div className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "1rem",
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
            <h1 className={css({ fontSize: "md" })}>{info.title}</h1>
            <p>{info.text}</p>
          </Card>)
        }
      </div>
    </div>
  );
}

export default Home;