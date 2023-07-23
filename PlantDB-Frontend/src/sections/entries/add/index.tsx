import { useNavigate, useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type PlantRecord, type PlantInfo } from "../../../types";
import { useToast } from "../../../components/Toast";
import SpeciesForm from "../../../components/SpeciesForm";
import Loading from "../../../components/Loading";
import HeaderBar from "../../../components/HeaderBar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Container from "../../../components/Container";
import FormSkeleton from "../FormSkeleton";

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
    await fetch(`/api/${species}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(plantRecords)
    });
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
      await queryClient.invalidateQueries(["info", species]);
      navigate("..");
      showToast(t("successMessages.AddSuccess"), "success");
    } catch {
      showToast(t("clientErrors.AddFailed"), "error");
    }
  };

  return (<>
    <HeaderBar>
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
        pb: "1rem"
      })}>
        <h1 className={css({ fontSize: "lg", lineHeight: 1 })}>
          {t(species?.toLocaleLowerCase() + ".singular")}
        </h1>
        <h2 className={css({ fontSize: "sm" })}>
          {t("add.title")}
        </h2>
      </div>

      {data?.schema ? <SpeciesForm
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