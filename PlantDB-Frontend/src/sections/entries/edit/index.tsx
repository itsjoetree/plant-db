import { useNavigate, useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type PlantRecord, type PlantInfo } from "../../../types";
import { useToast } from "../../../components/Toast";
import EntryForm from "../EntryForm";
import Loading from "../../../components/Loading";
import Container from "../../../components/Container";
import HeaderBar from "../../../components/HeaderBar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import getIdentifier from "../../../helpers/getIdentifier";
import FormSkeleton from "../FormSkeleton";
import getRequestFormData from "../../../helpers/getRequestFormData";
import getImage from "../../../helpers/getImage";
import Logo from "../../../components/Logo";

function Edit() {
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

  const identifier = data?.records && getIdentifier(data);

  const formMethods = useForm({
    mode: "onBlur", defaultValues: Object.assign({
      Image: getImage(data!)
    }, ...data?.schema?.filter(s => !s.isHidden)?.map(s => {
      const record = data?.records[0]?.find(r => r.propertyName === s.propertyName);

      const obj: { [key: string]: unknown } = {};
      obj[s.propertyName] = record?.value;
      return obj;
    }) ?? [])
  });

  const submitMutation = useMutation(async (plantRecords: PlantRecord[]) => {
    const resp = await fetch(`/api/${species}/${id}`, {
      method: "PUT",
      body: getRequestFormData(plantRecords, data?.schema!, !formMethods.getValues("Image"))
    });

    if (!resp.ok) throw new Error();
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["entries", species]);
      formMethods.reset();
      navigate(`/${species}/${id}`);
      showToast(t("successMessages.EditSuccess"), "success");
    }
  });

  const onSubmit: SubmitHandler<{ [key: string]: string }> = async (data) => {
    const plantRecords: PlantRecord[] = Object.entries(data).map(([key, value]) => {
      return {
        propertyName: key,
        value
      };
    });

    try {
      await submitMutation.mutateAsync(plantRecords);
    } catch {
      showToast(t("clientErrors.EditFailed"), "error");
    }
  };

  return (<>
    <HeaderBar>
      <Logo />
      <Breadcrumbs links={[
        {
          title: t(species?.toLocaleLowerCase() + ".plural"),
          to: `/${species}`
        },
        {
          title: identifier?.value?.toString() || "...",
          to: `/${species}/${id}`
        },
        {
          title: t("edit.title")
        }
      ]} />
    </HeaderBar>

    <Container>
      <div className={css({
        pb: "1rem"
      })}>
        <h1 className={css({ fontSize: "6xl", lineHeight: 1 })}>
          {identifier?.value?.toString()}
        </h1>
        <h2 className={css({ fontSize: "2xl" })}>
          {t("edit.title")}
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

export default Edit;

export function Skeleton() {
  const { species, id } = useParams();
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
          title: "...",
          to: `/${species}/${id}`
        },
        {
          title: t("edit.title")
        }
      ]} />
    </HeaderBar>

    <Container>
      <FormSkeleton />
    </Container>
  </>);
}