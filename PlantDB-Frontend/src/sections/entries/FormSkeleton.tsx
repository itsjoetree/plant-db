import { css } from "styled-system/css";
import LoadingSkeleton from "@/components/LoadingSkeleton";

function FormSkeleton() {

  return (<div className={css({ display: "flex", flexDir: "column", gap: "1rem", pb: "1rem" })}>
    {
      Array(12).fill("").map((_, i) => <LoadingSkeleton className={css({  padding: "0.5rem 1rem", borderRadius: "0.45rem", height: "2.75rem"})} key={i} />)
    }
  </div>);
}

export default FormSkeleton;