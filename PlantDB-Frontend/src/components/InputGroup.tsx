import type { ReactNode } from "react";
import { css, cx } from "../../styled-system/css";

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

  /**
   * Determines if input should be full width
   */
  fullWidth?: boolean
}

/**
 * Input group for forms consisting of label, input, and error message.
 */
function InputGroup({ label, input, error, fullWidth }: InputGroupProps) {
  return (<div className={cx(
    css({ display: "flex", flexDir: "column", gap: "4" }),
    fullWidth && css({ w: "100%" })
  )}>
    {label}

    <div className={css({ display: "flex", flexDir: "column", gap: "2"})}>
      {input}
      {error && <span className={css({ color: "error" })}>{error}</span>}
    </div>
  </div>);
}

export default InputGroup;
