import type { PropsWithChildren } from "react";
import { css } from "../../styled-system/css";
import { centeredStyles } from "../styles";

const bodyStyles = css({
  padding: "2rem 1rem",
  width: "100%",
  maxWidth: "container",
});

function LayoutBody({ children }: PropsWithChildren) {

  return (<div className={centeredStyles}>
    <div className={bodyStyles}>
      {children}
    </div>
  </div>);
}

export default LayoutBody;