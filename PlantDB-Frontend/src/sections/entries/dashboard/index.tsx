import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { useTranslation } from "react-i18next";
import { type PlantInfo } from "../../../types";
import { useQuery } from "react-query";
import getIdentifier from "../../../helpers/getIdentifier";
import Loading from "../../../components/Loading";
import Avatar from "../../../components/Avatar";
import Card from "../../../components/Card";

function Dashboard() {
  const { t } = useTranslation("entries");
  const { species, id } = useParams();
  const { data } = useQuery(["plant-dashboard", species, id], async (): Promise<PlantInfo> => {
    const response = await fetch(`/api/${species}/${id}`);
    return await response.json();
  });

  const identifier = data?.records && getIdentifier(data);

  return (<>
    <Helmet>
      <title>{t("entryTitle", { page: t(species + ".plural"), entry: identifier?.value ?? "..." })}</title>
    </Helmet>

    <div>
      <div className={css({
        display: "flex",
        gap: "1rem",
        pb: "2rem"
      })}>
        <Avatar size="lg" />

        <div className={css({ alignSelf: "center" })}>
          <h1 className={css({ fontSize: "md", lineHeight: 1 })}>
            {identifier?.value?.toString() || <Loading />}
          </h1>
          <h2 className={css({ fontSize: "sm" })}>
            {t(species?.toLocaleLowerCase() + ".singular")}
          </h2>
        </div>
      </div>

      <div className={css({ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" })}>
        {
          data?.schema?.filter(s => !s.isHidden)?.map(s => {
            let value = "";

            const record = data?.records[0]?.find(r => r.propertyName === s.propertyName);

            if (s.options) {
              value = t("choices." + s.options.find(o => o.value?.toString() === record?.value?.toString())?.name ?? "");
            } else value = record?.value?.toString()!;

            return (<Card key={s.propertyName} className={css({ width: "100%", sm: { width: "20rem" } })}>
              <h1 className={css({ fontSize: "sm", fontWeight: "bold" })}>
                {t("fields." + s.propertyName)}
              </h1>

              <span className={css({ fontSize: "sm" })}>{value}</span>
            </Card>);
          })
        }
      </div>
    </div>
  </>);
}

export default Dashboard;