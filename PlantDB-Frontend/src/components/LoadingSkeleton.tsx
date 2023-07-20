import type { ComponentProps } from "react";
import { css } from "../../styled-system/css";

function LoadingSkeleton({ className, ...props }: ComponentProps<"div">) {

  return (<div className={`${css({ animation: "pulse 2s linear infinite", bg: "grey" })} ${className}`} {...props}></div>);
}

export default LoadingSkeleton;