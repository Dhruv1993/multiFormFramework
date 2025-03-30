import React from "react";
import TextField from "../fields/TextField";
import { useFormContext } from "react-hook-form";

const Form2 = () => {
  const { getValues } = useFormContext();
  console.log("getValues: ", getValues());
  return (
    <div>
      <TextField name="email" label="Email" type="email" />
      <TextField name="phone" label="Phone" type="tel" />
    </div>
  );
};

export default Form2;
