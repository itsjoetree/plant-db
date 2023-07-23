import { useEffect, useRef } from "react";
import { css } from "../../styled-system/css";
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

function ActionModal({ title, text, show, onConfirm, onCancel, cancelText, confirmText }: ActionModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      ref.current?.showModal();
    } else if (ref.current?.open) {
      ref.current?.close();
    }
  }, [show]);

  return (<dialog className={css({ color: "secondary", bg: "primary", borderRadius: "1rem", p: "2.5rem 2rem", margin: "auto", _backdrop: {
    backdropFilter: "blur(5px)",
  } })} ref={ref}>
    <div className={css({display: "flex", flexDir: "column", justifyContent: "center", alignItems: "center", gap: "1rem"})}>
      <h1 className={css({ fontSize: "sm", fontWeight: "bold" })}>{title}</h1>
      <p>{text}</p>

      <div className={css({ display: "flex", gap: ".5rem" })}>
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