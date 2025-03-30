import React from "react";
import SelectField from "../fields/SelectField";
import { useFormContext } from "react-hook-form";

const Form3 = () => {
  const { watch, setValue } = useFormContext();
  const email = watch("email");

  React.useEffect(() => {
    if (email === "phonix.projects@gmail.com") {
      setValue("role", "admin");
    }
  }, [email]);

  return (
    <div>
      <SelectField
        name="role"
        label="User Role"
        options={[
          { value: "user", label: "User" },
          { value: "admin", label: "Admin" },
        ]}
      />
    </div>
  );
};

export default Form3;
