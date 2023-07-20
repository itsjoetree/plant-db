import { Link } from "react-router-dom";
import { css } from "../../styled-system/css";

type BreadcrumbLink = {
  title: string;
  to?: string;
}

type BreadcrumbsProps = {
  links: BreadcrumbLink[];
}

function Breadcrumbs({ links }: BreadcrumbsProps) {

  return (<div className={css({ display: "flex", gap: ".5rem" })}>
    {
      links.map((l, i) => <>
        {l.to ? (<Link key={l.title} to={l.to ?? ""} className={css({ fontWeight: "bold" })}>
          {l.title}
        </Link>) : (<span key={l.title}>
          {l.title}
        </span>)}
        {i + 1 !== links.length && <span>/</span>}
      </>)
    }
  </div>);
}

export default Breadcrumbs;