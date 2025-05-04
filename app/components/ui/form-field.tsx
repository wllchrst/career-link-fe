import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { type Control, type FieldPath, type FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
    control: Control<T>,
    name: FieldPath<T>,
    label: string,
    placeholder?: string,
    type?: string,
  }

export default function Field<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "",
    type = "text",
  }: Props<T>) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input type={type} placeholder={placeholder} {...field} checked={field.value}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }