import { useTranslation } from "react-i18next";
import { css } from "../../../styled-system/css";
import { Cactus, Flower, Leaf } from "tabler-icons-react";
import { vstack } from "../../../styled-system/patterns";
import type { TitleText } from "../../types";

function Hero() {
  const { t } = useTranslation("home");
  const hero: TitleText = t("hero", { returnObjects: true });

  return (<div className={vstack({
    backgroundColor: "secondary",
    color: "primary",
    padding: "20"
  })}>
    <p className={css({
      fontSize: "4xl",
      fontWeight: "bold"
    })}>{hero.text}</p>
    <h1 className={css({
      fontSize: "6xl",
      fontWeight: "bold"
    })}>{hero.title}</h1>
    <div className={css({ display: "flex", gap: "2" })}>
      <Leaf size={50} />
      <Cactus size={50} />
      <Flower size={50} />
    </div>
  </div>);
}

export default Hero;