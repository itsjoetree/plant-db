import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeaderBar from "@/components/HeaderBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import FormSkeleton from "../FormSkeleton";

function Skeleton() {
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

export default Skeleton;