import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Textarea } from "./textarea";

interface Props<T extends FieldValues> {
    control: Control<T>,
    name: FieldPath<T>,
    label: string,
    placeholder?: string,
  }

export default function TextAreaField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "",
  }: Props<T>) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }