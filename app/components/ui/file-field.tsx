import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { type Control, type FieldPath, type FieldValues } from "react-hook-form";

interface FileProps<T extends FieldValues> {
    control: Control<T>,
    name: FieldPath<T>,
    label: string,
    handlePreview: (e: React.ChangeEvent<HTMLInputElement>)=>void
  }

export default function FileField<T extends FieldValues>({control, name, label, handlePreview}:FileProps<T>) {
    return (
        <FormField
          control={control}
          name={name}
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Input
                  type="file"
                  value={value?.fileName}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                        handlePreview(e);
                      }
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
              
            </FormItem>
          )}
        />
    )
}