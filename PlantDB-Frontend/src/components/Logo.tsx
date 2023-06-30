import { Link } from "react-router-dom";
import { css } from "../../styled-system/css";
import { useTranslation } from "react-i18next";

export const logoStyles = css({
  fontSize: "1.5rem",
  fontWeight: "bold"
});

function Logo() {
  const { t } = useTranslation();
  return (<Link to="/" className={logoStyles}>{t("name")}</Link>);
}

export default Logo;