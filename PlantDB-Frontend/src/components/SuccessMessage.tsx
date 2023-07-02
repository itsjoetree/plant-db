import { CircleCheck } from "tabler-icons-react";
import Card from "./Card";
import { css } from "../../styled-system/css";
import { Link } from "react-router-dom";

const actionLinkStyles = css({
  fontWeight: "bold",
  cursor: "pointer",
  _hover: { textDecoration: "underline" }
});

type ActionLink = {
  title: string;
  to: string;
} | {
  title: string;
  onAction: () => void;
}

type SuccessProps = {
  title: string;
  text: string;
  actionLinks: ActionLink[]
}

/**
 * Returns a card that displays a success message and action links
 */
function SuccessMessage({ title, text, actionLinks }: SuccessProps) {

  return (<Card className={css({
    mx:"auto",
    maxWidth: "fit-content",
    p: "2rem 5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDir: "column",
    gap: "2rem"
  })}>
    <div>
      <CircleCheck size={150} />
      <h1 className={css({ fontSize: "md" })}>{title}</h1>
    </div>

    <p>{text}</p>

    <div className={css({ display: "flex", flexDir: "column", textAlign: "center", gap: "0.5rem" })}>
      {
        actionLinks.map(al => {
          if ("onAction" in al) return (<div key={al.title} onClick={al.onAction} className={actionLinkStyles}>
            {al.title}
          </div>);

          return <Link key={al.title} to={al.to} className={actionLinkStyles}>{al.title}</Link>;
        })
      }
    </div>
  </Card>);
}

export default SuccessMessage;