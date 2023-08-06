import { type SubmitHandler, type RegisterOptions, type UseFormReturn, Controller } from "react-hook-form";
import { PlantDataType } from "../constants";
import { type PlantInfo } from "../types";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { css } from "../../styled-system/css";
import InputGroup from "./InputGroup";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import FileSelection from "./FileSelection";

type SpeciesFormProps = {
  /**
   * Form methods returned from react-hook-form's useForm hook.
   */
  formMethods: UseFormReturn;

  /**
   * Schema of species used to render inputs.
   */
  schema: PlantInfo["schema"];

  /**
   * Function to call when the form is submitted, this is passed to react-hook-form's handleSubmit function.
   */
  onSubmit: SubmitHandler<{ [key: string]: string }>;

  submitButtonText: string;
}

/**
 * A form that supports the dynamic rendering of inputs based on a PlantProperty schema.
 */
function SpeciesForm({
  formMethods: {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty }
  },
  schema,
  onSubmit,
  submitButtonText }: SpeciesFormProps) {
  const { t } = useTranslation("entries");

  return (<form onSubmit={handleSubmit(onSubmit)}>
    <div className={css({ display: "flex", flexDir: "column", gap: "2", pb: "2" })}>
      <Controller
        name="Image"
        rules={{
          validate: {
            fileType: (f: File | string) => f instanceof File && f && !f.type.match(/^image\/(png|jpg|jpeg)$/) ? t("clientErrors.InvalidFileType") : undefined,
            fileSize: (f: File | string) => f instanceof File && f && f.size / (1024 * 1024) > 2 ? t("clientErrors.InvalidFileSize") : undefined
          }
        }}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <FileSelection
            title={t("photoSelect.title")}
            message={t("photoSelect.message")}
            onFileSelect={(f) => {
              onChange(f);
              onBlur(); // Used to update error state since our form mode is "onBlur"
            }}
            onDelete={() => onChange(null)}
            imagePreview={value instanceof File ? URL.createObjectURL(value) : value}
            error={error?.message}
            showDelete={!!value}
          />
        )}
      />

      {
        schema.filter(s => !s.isHidden).map(s => {
          const pdt = PlantDataType[s.type];
          const error = errors[s.propertyName]?.message;

          let inputType: "text" | "number" | "select" = "text";
          let groupInput: ReactNode = null;

          const options: RegisterOptions = {
            required: s.isRequired ? t("formMessages.required", { field: t("fields." + s.propertyName) }) : false,
          };

          if (pdt === "Enum")
            inputType = "select";
          else if (pdt === "Decimal" || pdt === "Int")
            inputType = "number";
          else inputType = "text";

          if (inputType === "select") groupInput = (<Select
            {...register(s.propertyName, options)}
            error={!!error}
          >
            <option></option>
            {
              s.options?.map(o => <option
                key={o.name}
                value={o.value}>
                {t("choices." + o.name)}
              </option>)
            }
          </Select>);
          else groupInput = (<Input
            {...register(s.propertyName, options)}
            error={!!error}
            type={inputType}
            maxLength={s.maxLength}
          />);

          return (<InputGroup
            key={s.propertyName}
            error={typeof error === "string" ? error : undefined}
            label={t("fields." + s.propertyName)}
            input={groupInput}
          />);
        })
      }
    </div>

    <Button disabled={!isDirty} type="submit">{submitButtonText}</Button>
  </form>);
}

export default SpeciesForm;