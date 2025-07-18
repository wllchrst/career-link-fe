import { type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";


export interface SelectValue<TId> {
    value: TId,
    text: string
}
  
interface SelectProps<T extends FieldValues, TId> {
    control: Control<T>,
    name: FieldPath<T>,
    label: string,
    values: SelectValue<TId>[]
  }
  

export default function SelectField<T extends FieldValues>({
    control,
    name,
    label,
    values,
  }: SelectProps<T, string>){

    return (<FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            {label && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white text-black border border-gray-300 focus:ring-2 w-full focus:ring-ring focus:ring-offset-2">
                  <SelectValue placeholder="Select an option"  className="bg-white text-black border border-gray-300"/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {values.map((e, idx) => <SelectItem key={idx} value={e.value}>{e.text}</SelectItem>)}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />)
}