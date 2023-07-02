import { useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type PlantRecord, type PlantInfo } from "../../../types";
import SuccessMessage from "../../../components/SuccessMessage";
import SpeciesForm from "../../../components/SpeciesForm";
import Loading from "../../../components/Loading";

function Add() {
  const queryClient = useQueryClient();
  const { t } = useTranslation("entries");
  const { species } = useParams();
  const formMethods = useForm({ mode: "onBlur" });
  const { data } = useQuery(["schema", species], async (): Promise<PlantInfo> => {
    const response = await fetch(`/api/${species}`);
    return await response.json();
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
      await queryClient.invalidateQueries(["plant-info", species]);
      formMethods.reset();
    } catch {
      // TODO: Replace with toast or something indicating an error message.
      console.error("Unable to add record.");
    }
  };

  if (submitMutation.isSuccess) return (<SuccessMessage
    title={t("success")}
    text={t("add.success", { species: t(species + ".singular") })}
    actionLinks={[
      {
        title: t("continue"),
        to: `/${species}`
      },
      {
        title: t("add.reset"),
        onAction: () => {
          submitMutation.reset();
        }
      }
    ]}
  />);

  return (<div>
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
  </div>);
}

export default Add;