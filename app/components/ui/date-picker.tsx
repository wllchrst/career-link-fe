import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { CalendarIcon } from "lucide-react"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { ScrollArea, ScrollBar } from "./scroll-area";
import { cn } from "~/lib/utils"

interface Props<T extends FieldValues> {
    control: Control<T>,
    name: FieldPath<T>,
    label: string,
    onSelect: (name: string, date: Date|undefined) => void,
    onTimeChange: (name: string,type: "hour" | "minute", value: string) => void
}

export default function DatePicker<T extends FieldValues>(
    {control, name, label, onSelect, onTimeChange}: Props<T>
) {


  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "MM/dd/yyyy HH:mm")
                      ) : (
                        <span>MM/DD/YYYY HH:mm</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={(e) => onSelect(name, e)}
                      disabled={e => e.getTime() < new Date().getTime()}
                      autoFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 24 }, (_, i) => i)
                            .map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                variant={
                                  field.value &&
                                  new Date(field.value).getHours() === hour
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                    onTimeChange(name, 'hour', hour.toString())
                                }
                              >
                                {hour}
                              </Button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map(
                            (minute) => (
                              <Button
                                key={minute}
                                size="icon"
                                variant={
                                  field.value &&
                                  new Date(field.value).getMinutes() === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  onTimeChange(name,"minute", minute.toString())
                                }
                              >
                                {minute.toString().padStart(2, '0')}
                              </Button>
                            )
                          )}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

  );
}