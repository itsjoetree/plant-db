import { css } from "../../styled-system/css";
import Avatar from "./Avatar";

type FileSelectionProps = {
  title: string;
  message: string;
  onFileSelect: (file: File) => void;
}

function FileSelection({ title, message, onFileSelect }: FileSelectionProps) {

  return (<div>
    <label className={css({
      display: "block", cursor: "pointer", p: "4",
      borderRadius: "md", borderColor: "secondary", borderWidth: "0.15rem"
    })}
    htmlFor="fileInput">
      <div className={css({ display: "flex", gap: "4", alignItems: "center" })}>
        <Avatar size="lg" />

        <div>
          <div className={css({ fontSize: "2xl" })}>{title}</div>
          <div>{message}</div>
        </div>
      </div>
    </label>
    <input onChange={(e) => {
      if (e.target.files?.[0])
        onFileSelect(e.target.files[0]);
    }} id="fileInput" type="file" className={css({ visibility: "hidden", width: 0 })} />
  </div>);
}

export default FileSelection;