import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";

interface IProps {
  options: {
    key: string;
    label: string;
  }[];
  name: string;
  label: string;
  variant?: "bordered" | "faded" | "flat" | "filled";
  disabled?: boolean;
  defaultSelectedKeys?:string[];
}

const GWSelect = ({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
  defaultSelectedKeys,
}: IProps) => {
  const { control } = useFormContext(); // Access form methods from react-hook-form

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Select
            {...field} // Spread the field props (value, onChange, ref)
            label={label}
            variant={variant}
            isDisabled={disabled}
            aria-label={label}
            defaultSelectedKeys={defaultSelectedKeys}
          >
            {options.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          {fieldState?.error && (
            <p style={{ color: "red", fontSize: "12px" }}>{fieldState?.error?.message}</p>
          )}
        </>
      )}
    />
  );
};

export default GWSelect;
