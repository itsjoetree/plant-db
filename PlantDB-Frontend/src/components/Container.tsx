import type { ComponentProps } from "react";
import { container } from "../../styled-system/patterns";

function Container({ children, className }: ComponentProps<"div">) {

  return (<div className={`${container({ padding: "1rem 5rem", maxW: "80rem" })} ${className}`}>
    {children}
  </div>);
}

export default Container;