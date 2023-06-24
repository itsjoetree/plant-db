import { useAtomValue } from "jotai";
import { apiInfoAtom } from "../../Layout";
import { useTranslation } from "react-i18next";

/**
 * Landing page of application.
 */
function Home() {
  const { t } = useTranslation("home");
  const apiInfo = useAtomValue(apiInfoAtom);

  return (
    <div>
      <h1>{t("title")}</h1>

      <div style={{ display: "flex", gap: "1rem" }}>
        {
          apiInfo?.map(ai => <span key={ai.path}>{ai.singularDisplayName}</span>)
        }
      </div>
    </div>
  );
}

export default Home;