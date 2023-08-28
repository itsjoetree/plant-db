import { useEffect, useState } from "react";
import { css, cx } from "styled-system/css";
import { Trash } from "tabler-icons-react";
import { circle } from "styled-system/patterns";
import Avatar from "./Avatar";

type FileSelectionProps = {
  title: string;
  message: string;
  imagePreview?: string | File;
  error?: string;
  showDelete?: boolean;
  onFileSelect: (file: File) => void;
  onDelete?: () => void;
}

/**
 * Component for selecting an image file.
 */
function FileSelection({ title, message, imagePreview, error, showDelete, onFileSelect, onDelete }: FileSelectionProps) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (typeof imagePreview === "string")
      setUrl(imagePreview);
    else if (imagePreview instanceof File)
      setUrl(URL.createObjectURL(imagePreview));
    else
      setUrl(prev => {
        prev && URL.revokeObjectURL(prev);
        return undefined;
      });
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
          <Avatar className={error && css({ borderColor: "error" })} src={url} size="lg" />
          {showDelete && <div onClick={(e) => {
            e.preventDefault();
            onDelete?.();
          }} className={circle({
            position: "absolute", height: "8", width: "8",
            background: "primary", bottom: 0, right: 0,
            cursor: "pointer"
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