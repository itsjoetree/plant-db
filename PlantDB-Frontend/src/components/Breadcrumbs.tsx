import { Link } from "react-router-dom";
import { css } from "../../styled-system/css";
import { Fragment } from "react";

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
      links.map((l, i) => <Fragment key={l.title}>
        {l.to ? (<Link to={l.to ?? ""} className={css({ fontWeight: "bold" })}>
          {l.title}
        </Link>) : (<span>
          {l.title}
        </span>)}
        {i + 1 !== links.length && <span>/</span>}
      </Fragment>)
    }
  </div>);
}

export default Breadcrumbs;