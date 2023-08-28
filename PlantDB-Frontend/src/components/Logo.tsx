import { Link } from "react-router-dom";
import { css } from "styled-system/css";
import { useTranslation } from "react-i18next";

const logoStyles = css({
  fontSize: "2xl",
  fontWeight: "bold"
});

type LogoProps = {
  noLink?: boolean;
}

function Logo({ noLink }: LogoProps) {
  const { t } = useTranslation();
  return (
    !noLink ? <Link to="/" className={logoStyles}>{t("name")}</Link> : <span className={logoStyles}>{t("name")}</span>
  );
}

export default Logo;