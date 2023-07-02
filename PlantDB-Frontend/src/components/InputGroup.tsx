import type { ReactNode } from "react";
import { css } from "../../styled-system/css";

type InputGroupProps = {
  /**
   * Text that appears above input
   */
  label: ReactNode;

  /**
   * Input to be rendered inside group
   */
  input: ReactNode;

  /**
   * Error message shown below input
   */
  error?: string;
}

function InputGroup({ label, input, error }: InputGroupProps) {
  return (<div className={css({ display: "flex", flexDir: "column", gap: "1rem" })}>
    {label}

    <div className={css({ display: "flex", flexDir: "column", gap: "0.5rem"})}>
      {input}
      {error && <span className={css({ color: "error" })}>{error}</span>}
    </div>
  </div>);
}

export default InputGroup;
