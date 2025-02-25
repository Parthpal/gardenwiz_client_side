/* eslint-disable prettier/prettier */
"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "../../../../types";


interface IProps extends IInput {}

export default function GWInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  className,
  color
}: IProps) {

  const { register,formState: { errors },} = useFormContext();

  return (
    <Input
      {...register(name)}
      className={className}
      color={color}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
      
    />
  );
}