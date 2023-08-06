import { useEffect } from "react";
import { css, cx } from "../../styled-system/css";
import Avatar from "./Avatar";
import { Trash } from "tabler-icons-react";
import { circle } from "../../styled-system/patterns";

type FileSelectionProps = {
  title: string;
  message: string;
  imagePreview?: string;
  error?: string;
  showDelete?: boolean;
  onFileSelect: (file: File) => void;
  onDelete?: () => void;
}

function FileSelection({ title, message, imagePreview, error, showDelete, onFileSelect, onDelete }: FileSelectionProps) {

  useEffect(() => {
    return () => {
      if (imagePreview && typeof imagePreview === "string")
        URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (<div>
    <label className={cx(css({
      display: "block", cursor: "pointer", p: "4",
      borderRadius: "md", borderColor: "secondary", borderWidth: "0.15rem"
    }),
    error && css({ borderColor: "error" }))}
    htmlFor="fileInput">
      <div className={css({ display: "flex", gap: "4", alignItems: "center" })}>
        <div className={css({ position: "relative" })}>
          <Avatar className={error && css({ borderColor: "error" })} src={imagePreview} size="lg" />
          {showDelete && <div onClick={(e) => {
            e.preventDefault();
            onDelete?.();
          }} className={circle({
            position: "absolute", height: "8", width: "8",
            background: "primary", bottom: 0, right: 0,
            cursor: "pointer",
            zIndex: 10
          })}>
            <Trash size={18} />
          </div>}
        </div>

        <div>
          <div className={css({ fontSize: "2xl" })}>{title}</div>
          <div>{message}</div>
          {error && <div className={css({ color: "error" })}>{error}</div>}
        </div>
      </div>
    </label>
    <input onChange={(e) => {
      if (e.target.files?.[0])
        onFileSelect(e.target.files[0]);
    }} id="fileInput" type="file" className={css({ display: "none" })} />
  </div>);
}

export default FileSelection;