import { useEffect, useRef } from "react";
import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import Button from "./Button";

type ActionModalProps = {
  title: string;
  text: string;
  show: boolean;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Modal that asks for user confirmation before performing an action.
 */
function ActionModal({ title, text, show, onConfirm, onCancel, cancelText, confirmText }: ActionModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      ref.current?.showModal();
    } else if (ref.current?.open) {
      ref.current?.close();
    }
  }, [show]);

  return (<dialog className={css({
    color: "secondary", bg: "primary",
    borderRadius: "xl", py: "10", px: "8", margin: "auto",
    _backdrop: {
      backdropFilter: "blur(5px)",
    } })} ref={ref}>
    <div className={vstack({ gap: "4" })}>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>{title}</h1>
      <p>{text}</p>

      <div className={css({ display: "flex", gap: "2" })}>
        <Button onClick={() => {
          onCancel();
          ref?.current?.close();
        }}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </div>
  </dialog>);
}

export default ActionModal;