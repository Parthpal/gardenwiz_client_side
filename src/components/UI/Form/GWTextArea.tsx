import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";

import { IInput } from "../../../../types";


interface IProps extends IInput {
  type?: string;
  value?:string
}

export default function GWTextarea({
  name,
  label,
  variant = "bordered",
  className,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      variant={variant}
      value={currentValue || ""}
      className={className}
    />
  );
}