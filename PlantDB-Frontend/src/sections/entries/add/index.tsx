import { useNavigate, useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type PlantRecord, type PlantInfo } from "../../../types";
import { useToast } from "../../../components/Toast";
import EntryForm from "../EntryForm";
import Loading from "../../../components/Loading";
import HeaderBar from "../../../components/HeaderBar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Container from "../../../components/Container";
import FormSkeleton from "../FormSkeleton";
import getRequestFormData from "../../../helpers/getRequestFormData";
import Logo from "../../../components/Logo";
import { Helmet } from "react-helmet";

function Add() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation("entries");
  const { species } = useParams();
  const { showToast } = useToast();
  const formMethods = useForm({ mode: "onBlur" });
  const { data } = useQuery(["schema", species], async (): Promise<PlantInfo> => {
    const response = await fetch(`/api/${species}`);
    return await response.json();
  }, {
    suspense: true
  });

  const submitMutation = useMutation(async (plantRecords: PlantRecord[]) => {
    const resp = await fetch(`/api/${species}`, {
      method: "POST",
      body: getRequestFormData(plantRecords, data?.schema!)
    });

    return resp.json();
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["entries", species, "index"]);
      showToast(t("successMessages.AddSuccess"), "success");
      navigate("..");
    }
  });

  const onSubmit: SubmitHandler<{ [key: string]: string }> = async (data) => {
    const plantRecords: PlantRecord[] = Object.entries(data).map(([key, value]) => {
      return {
        propertyName: key,
        value: value
      };
    });

    try {
      await submitMutation.mutateAsync(plantRecords);
    } catch {
      showToast(t("clientErrors.AddFailed"), "error");
    }
  };

  return (<>
    <Helmet>
      <title>{t(species?.toLocaleLowerCase() + ".plural")} - {t("add.title")}</title>
    </Helmet>

    <HeaderBar>
      <Logo />
      <Breadcrumbs links={[
        {
          title: t(species?.toLocaleLowerCase() + ".plural"),
          to: `/${species}`
        },
        {
          title: t("add.title")
        }
      ]} />
    </HeaderBar>

    <Container>
      <div className={css({
        pb: "4"
      })}>
        <h1 className={css({ fontSize: "6xl", lineHeight: 1 })}>
          {t(species?.toLocaleLowerCase() + ".singular")}
        </h1>
        <h2 className={css({ fontSize: "2xl" })}>
          {t("add.title")}
        </h2>
      </div>

      {data?.schema ? <EntryForm
        formMethods={formMethods}
        onSubmit={onSubmit}
        schema={data?.schema}
        submitButtonText={t("submit")}
      /> : <Loading />}
    </Container>
  </>);
}

export default Add;

export function Skeleton() {
  const { species } = useParams();
  const { t } = useTranslation("entries");

  return (<>
    <HeaderBar>
      <Logo />
      <Breadcrumbs links={[
        {
          title: t(species?.toLocaleLowerCase() + ".plural"),
          to: `/${species}`
        },
        {
          title: t("add.title")
        }
      ]} />
    </HeaderBar>

    <Container>
      <FormSkeleton />
    </Container>
  </>);
}