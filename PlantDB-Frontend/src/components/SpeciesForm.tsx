import { type SubmitHandler, type RegisterOptions, type UseFormReturn } from "react-hook-form";
import { PlantDataType } from "../constants";
import { type PlantInfo } from "../types";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { css } from "../../styled-system/css";
import InputGroup from "./InputGroup";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

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
    handleSubmit,
    formState: { errors }
  },
  schema,
  onSubmit,
  submitButtonText }: SpeciesFormProps) {
  const { t } = useTranslation("entries");

  return (<form onSubmit={handleSubmit(onSubmit)}>
    <div className={css({ display: "flex", flexDir: "column", gap: "1rem", pb: "1rem" })}>
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

    <Button type="submit">{submitButtonText}</Button>
  </form>);
}

export default SpeciesForm;