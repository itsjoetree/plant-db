import { useState, type ReactNode, useEffect } from "react";
import { css, cx } from "../../styled-system/css";
import constate from "constate";

type Severity = "error" | "success";

type ToastProviderProps = {
  /**
   * Milliseconds after which the toast will be removed.
   */
  timeoutAfterMs?: number;

  /**
   * Closes label for Toast, for screen readers.
   */
  ["aria-label-close"]: string;

  children: ReactNode;
};

type ToastProps = {
  id?: string;
  message: string;
  severity: Severity;
}

const [ToastContext, useToastState] = constate(useStackState);

function useStackState({ timeoutAfterMs, ["aria-label-close"]: ariaLabelClose }: { timeoutAfterMs?: number, ["aria-label-close"]: string }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  function addToast(toast: ToastProps) {
    setToasts([...toasts, { id: crypto.randomUUID(), ...toast }]);
  }

  function removeToast(id: string) {
    setToasts(toasts.filter(toast => toast.id !== id));
  }

  return {
    toasts,
    addToast,
    timeoutAfterMs,
    ariaLabelClose,
    removeToast
  };
}

function Toast({ id, message, severity }: ToastProps) {
  const { removeToast, ariaLabelClose, timeoutAfterMs } = useToastState();

  useEffect(() => {
    if (id && timeoutAfterMs)
      setTimeout(() => { removeToast(id); }, timeoutAfterMs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, timeoutAfterMs]);

  return (
    <div className={
      cx(css({ zIndex: 10, display: "flex", gap: ".75rem", borderRadius: "1rem", p: "1rem" }),
        severity === "error" && css({ color: "red.800", bg: "red.300" }),
        severity === "success" && css({ color: "green.800", bg: "green.300" }))
    }>
      <div>{message}</div>
      {id && <button aria-label={ariaLabelClose} className={css({ cursor: "pointer" })} onClick={() => removeToast(id)}>&times;</button>}
    </div>
  );
}

function Stack() {
  const { toasts } = useToastState();

  return (
    <div className={css({
      position: "absolute", display: "flex", flexDir: "column", gap: ".5rem",
      right: 5, bottom: 5 })}>
      {toasts.map(toast => <Toast key={toast.id} {...toast} />)}
    </div>
  );
}

export function ToastProvider({ children, timeoutAfterMs, ["aria-label-close"]: ariaLabelClose }: ToastProviderProps) {

  return (
    <ToastContext timeoutAfterMs={timeoutAfterMs} aria-label-close={ariaLabelClose}>
      {children}
      <Stack />
    </ToastContext>
  );
}

export function useToast() {
  const { addToast } = useToastState();

  function showToast(message: string, severity: Severity) {
    addToast({ message, severity });
  }

  return {
    showToast
  };
}