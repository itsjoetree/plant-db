import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "@/components/Container";
import HeaderBar from "@/components/HeaderBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Logo from "@/components/Logo";
import FormSkeleton from "../FormSkeleton";

function Skeleton() {
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

export default Skeleton;