import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { circle, vstack } from "styled-system/patterns";
import Container from "@/components/Container";
import HeaderBar from "@/components/HeaderBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Logo from "@/components/Logo";

function Skeleton() {
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

          <LoadingSkeleton className={circle({ height: "8rem", width: "8rem" })} />

          <div className={vstack({ gap: "2", alignItems: "start", justifyContent: "center" })}>
            <LoadingSkeleton className={css({ height: "2.5rem", width: "6rem" })} />
            <LoadingSkeleton className={css({ height: "2.25rem", width: "4rem" })} />
          </div>
        </div>
      </div>

      <div className={css({ display: "flex", justifyContent: "center", gap: "2", flexWrap: "wrap" })}>
        {
          Array(6).fill("").map((_, i) => <LoadingSkeleton key={i} className={css({
            borderRadius: "xl",
            width: "100%",
            height: "6rem",
            sm: { width: "20rem" }
          })} />)
        }
      </div>
    </Container>
  </>);
}

export default Skeleton;