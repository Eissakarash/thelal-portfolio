import React from "react";

import FileUpload from "./upload";
import { FormControl, FormField, FormItem, FormLabel } from "./form";

function FormUpload({
  form,
  name,
  label,
  className,
}: {
  form: any;
  name: string;
  label: string;
  className: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <FileUpload
              label={label}
              className={className}
              onChange={field.onChange}
              value={field.value}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default FormUpload;
