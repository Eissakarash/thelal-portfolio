import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { DatePicker } from "../atoms/data-picker";

function FormDate({
  form,
  name,
  label,
}: {
  form: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <DatePicker {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormDate;
