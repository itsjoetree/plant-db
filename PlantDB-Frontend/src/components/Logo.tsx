import { Link } from "react-router-dom";
import { css } from "../../styled-system/css";
import { useTranslation } from "react-i18next";

function Logo() {
  const { t } = useTranslation();
  return (<Link to="/" className={css({
    fontSize: "2xl",
    fontWeight: "bold"
  })}>{t("name")}</Link>);
}

export default Logo;