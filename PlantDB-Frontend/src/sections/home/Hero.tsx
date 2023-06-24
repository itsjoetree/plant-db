import { useTranslation } from "react-i18next";
import { css } from "../../../styled-system/css";

const styles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "secondary",
  color: "primary",
  padding: "5rem"
});

const heading = css({
  fontSize: "lg",
  fontWeight: "bold"
});

const paragraph = css({
  fontSize: "md",
  fontWeight: "bold"
});

function Hero() {
  const { t } = useTranslation("home");
  const hero: TitleText = t("hero", { returnObjects: true });

  return (<div className={styles}>
    <p className={paragraph}>{hero.text}</p>
    <h1 className={heading}>{hero.title}</h1>
  </div>);
}

export default Hero;