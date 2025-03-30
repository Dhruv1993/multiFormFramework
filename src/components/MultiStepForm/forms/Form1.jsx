import React from "react";
import TextField from "../fields/TextField";
import DateField from "../fields/DateField";

const Form1 = () => {
  return (
    <div>
      <TextField name="firstName" label="First Name" />
      <TextField name="lastName" label="Last Name" />
      <DateField name="birthDate" label="Birth Date" />
    </div>
  );
};

export default Form1;
