import { type SubmitHandler, type RegisterOptions, type UseFormReturn, Controller } from "react-hook-form";
import { PlantDataType } from "../../constants";
import type { PlantProperty, PlantInfo } from "../../types";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { css } from "../../../styled-system/css";
import InputGroup from "../../components/InputGroup";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import FileSelection from "../../components/FileSelection";
import chunk from "lodash/chunk";

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
function EntryForm({
  formMethods: {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  },
  schema,
  onSubmit,
  submitButtonText }: SpeciesFormProps) {
  const { t } = useTranslation("entries");

  return (<form onSubmit={handleSubmit(onSubmit)}>
    <div className={css({ display: "flex", flexDir: "column", gap: "4", pb: "4" })}>
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
            imagePreview={(value instanceof File && !isSubmitting) ? URL.createObjectURL(value) : value}
            error={error?.message}
            showDelete={!!value}
          />
        )}
      />

      {
        // Chunking schema into groups of 2 to render 2 inputs per row on desktop.
        chunk(schema.filter(s => !s.isHidden), 2).map((chunks: PlantProperty[]) => (
          <div key={`${chunks[0].propertyName}-${chunks[1] ? chunks[1].propertyName : ""}`}
            className={css({ display: "flex", flexDir: "column", gap: "4", sm: { flexDir: "row" } })}>
            {
              chunks.map((schema: PlantProperty) => {

                const pdt = PlantDataType[schema.type];
                const error = errors[schema.propertyName]?.message;

                let inputType: "text" | "number" | "select" = "text";
                let groupInput: ReactNode = null;

                const options: RegisterOptions = {
                  required: schema.isRequired ? t("formMessages.required", { field: t("fields." + schema.propertyName) }) : false,
                };

                if (pdt === "Enum")
                  inputType = "select";
                else if (pdt === "Decimal" || pdt === "Int")
                  inputType = "number";
                else inputType = "text";

                if (inputType === "select") groupInput = (<Select
                  {...register(schema.propertyName, options)}
                  id={schema.propertyName}
                  error={!!error}
                >
                  <option></option>
                  {
                    schema.options?.map(o => <option
                      key={o.name}
                      value={o.value}>
                      {t("choices." + o.name)}
                    </option>)
                  }
                </Select>);
                else groupInput = (<Input
                  {...register(schema.propertyName, options)}
                  id={schema.propertyName}
                  error={!!error}
                  type={inputType}
                  maxLength={schema.maxLength}
                />);

                return (<InputGroup
                  key={schema.propertyName}
                  fullWidth
                  error={typeof error === "string" ? error : undefined}
                  label={<label htmlFor={schema.propertyName}>{t("fields." + schema.propertyName)}</label>}
                  input={groupInput}
                />);
              })
            }
          </div>)
        )
      }
    </div>

    <Button disabled={!isDirty || isSubmitting} type="submit">{submitButtonText}</Button>
  </form>);
}

export default EntryForm;