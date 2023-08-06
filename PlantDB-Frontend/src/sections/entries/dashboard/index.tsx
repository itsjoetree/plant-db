import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { useTranslation } from "react-i18next";
import { type PlantInfo } from "../../../types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { circle, hstack, vstack } from "../../../../styled-system/patterns";
import { useToast } from "../../../components/Toast";
import getIdentifier from "../../../helpers/getIdentifier";
import Loading from "../../../components/Loading";
import Avatar from "../../../components/Avatar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import HeaderBar from "../../../components/HeaderBar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import ActionModal from "../../../components/ActionModal";
import getImage from "../../../helpers/getImage";
import Logo from "../../../components/Logo";

function Dashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation("entries");
  const { showToast } = useToast();
  const { species, id } = useParams();
  const { data } = useQuery(["entries", species, id], async (): Promise<PlantInfo> => {
    const response = await fetch(`/api/${species}/${id}`);
    return await response.json();
  }, {
    suspense: true
  });
  const deleteMutation = useMutation(["deleteSpecies", species, id], async () => {
    await fetch(`/api/${species}/${id}`, {
      method: "DELETE"
    });
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["entries", species, "index"]);
      showToast(t("successMessages.DeletionSuccess"), "success");
      navigate("..");
    }
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const identifier = data?.records && getIdentifier(data);

  return (<>
    <Helmet>
      <title>{t("entryTitle", { page: t(species + ".plural"), entry: identifier?.value ?? "..." })}</title>
    </Helmet>

    <ActionModal
      title={t("deleteModal.title")}
      text={t("deleteModal.text")}
      show={showDeleteModal}
      confirmText={t("confirm")}
      cancelText={t("cancel")}
      onCancel={() => setShowDeleteModal(false)}
      onConfirm={async () => {
        try {
          await deleteMutation.mutateAsync();
        } catch {
          showToast(t("clientErrors.DeletionFailed"), "error");
        }
      }}
    />

    <HeaderBar>
      <Logo />
      <Breadcrumbs links={[
        {
          title: t(species?.toLocaleLowerCase() + ".plural"),
          to: `/${species}`
        },
        {
          title: identifier?.value?.toString() || "...",
        }
      ]} />
    </HeaderBar>

    <Container>
      <div className={vstack({ gap: "4", alignItems: "start", pb: "8" })}>
        <div className={css({
          display: "flex",
          gap: "4"
        })}>
          <Avatar src={data && getImage(data)} size="lg" />

          <div className={css({ alignSelf: "center" })}>
            <h1 className={css({ fontSize: "4xl", lineHeight: 1 })}>
              {identifier?.value?.toString() || <Loading />}
            </h1>
            <h2 className={css({ fontSize: "2xl" })}>
              {t(species?.toLocaleLowerCase() + ".singular")}
            </h2>
          </div>
        </div>

        <div className={hstack({ gap: "2" })}>
          <Button to={`/${species}/${id}/edit`}>Edit</Button>
          <Button onClick={() => setShowDeleteModal(true)}>Delete</Button>
        </div>
      </div>

      <div className={css({ display: "flex", justifyContent: "center", gap: "4", flexWrap: "wrap" })}>
        {
          data?.schema?.filter(s => !s.isHidden)?.map(s => {
            let value = "";

            const record = data?.records[0]?.find(r => r.propertyName === s.propertyName);

            if (s.options) {
              value = t("choices." + s.options.find(o => o.value?.toString() === record?.value?.toString())?.name ?? "");
            } else value = record?.value?.toString()!;

            return (<Card key={s.propertyName} className={css({ width: "100%", sm: { width: "20rem" } })}>
              <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>
                {t("fields." + s.propertyName)}
              </h1>

              <span>{value}</span>
            </Card>);
          })
        }
      </div>
    </Container>
  </>);
}

export default Dashboard;

export function Skeleton() {
  const { species } = useParams();
  const { t } = useTranslation();

  return (<>
    <HeaderBar>
      <Logo />
      <Breadcrumbs links={[
        {
          title: t(species?.toLocaleLowerCase() + ".plural"),
          to: `/${species}`
        },
        {
          title: "...",
        }
      ]} />
    </HeaderBar>

    <Container>
      <div className={vstack({ gap: "4", alignItems: "start", pb: "8" })}>
        <div className={css({
          display: "flex",
          gap: "4"
        })}>

          <LoadingSkeleton className={circle({height: "8rem", width: "8rem"})} />

          <div className={vstack({ gap: "2", alignItems: "start", justifyContent: "center" })}>
            <LoadingSkeleton className={css({height: "2.5rem", width: "6rem"})} />
            <LoadingSkeleton className={css({height: "2.25rem", width: "4rem"})} />
          </div>
        </div>
      </div>

      <div className={css({ display: "flex", justifyContent: "center", gap: "2", flexWrap: "wrap" })}>
        {
          Array(6).fill("").map((_, i) => <LoadingSkeleton key={i} className={css({ borderRadius: "xl",
            width: "100%",
            height: "6rem",
            sm: { width: "20rem" } })} />)
        }
      </div>
    </Container>
  </>);
}