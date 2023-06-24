import { css } from "../../styled-system/css";
import { useTranslation } from "react-i18next";

const styles = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const heading = css({
  fontSize: "10rem",
  fontWeight: "bold"
});

function NotFound() {
  const { t } = useTranslation();
  const notFound: TitleText = t("notFound", { returnObjects: true });

  return (
    <div className={styles}>
      <h1 className={heading}>{notFound.title}</h1>
      <p>{notFound.text}</p>
    </div>
  );
}

export default NotFound;