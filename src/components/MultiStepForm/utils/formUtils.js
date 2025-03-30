import * as yup from "yup";

// Common validation patterns
export const PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
};

// Common validation messages
export const MESSAGES = {
  REQUIRED: (field) => `${field} is required`,
  MIN_LENGTH: (field, length) =>
    `${field} must be at least ${length} characters`,
  MAX_LENGTH: (field, length) => `${field} cannot exceed ${length} characters`,
  INVALID_EMAIL: "Invalid email address",
  INVALID_PHONE: "Invalid phone number format",
  INVALID_PASSWORD:
    "Password must contain at least 8 characters, one uppercase, one lowercase and one number",
  INVALID_URL: "Invalid URL format",
  INVALID_ZIP: "Invalid ZIP code format",
  PASSWORDS_MUST_MATCH: "Passwords must match",
  TERMS_REQUIRED: "You must accept the terms and conditions",
  DATE_FUTURE: "Date cannot be in the future",
  DATE_PAST: "Date cannot be in the past",
  INVALID_DATE: "Please enter a valid date",
};

// Field-specific validation creators
const createStringValidation = (field) => {
  let schema = yup.string().trim();

  if (field.required) {
    schema = schema.required(
      field.validation?.required || MESSAGES.REQUIRED(field.label)
    );
  }

  if (field.validation?.minLength) {
    schema = schema.min(
      field.validation.minLength.value,
      field.validation.minLength.message ||
        MESSAGES.MIN_LENGTH(field.label, field.validation.minLength.value)
    );
  }

  if (field.validation?.maxLength) {
    schema = schema.max(
      field.validation.maxLength.value,
      field.validation.maxLength.message ||
        MESSAGES.MAX_LENGTH(field.label, field.validation.maxLength.value)
    );
  }

  if (field.validation?.pattern) {
    schema = schema.matches(
      field.validation.pattern.value,
      field.validation.pattern.message
    );
  }

  return schema;
};

const createEmailValidation = (field) => {
  let schema = yup
    .string()
    .email(MESSAGES.INVALID_EMAIL)
    .matches(PATTERNS.EMAIL, MESSAGES.INVALID_EMAIL);

  if (field.required) {
    schema = schema.required(
      field.validation?.required || MESSAGES.REQUIRED(field.label)
    );
  }

  return schema;
};

const createPhoneValidation = (field) => {
  let schema = yup.string().matches(PATTERNS.PHONE, MESSAGES.INVALID_PHONE);

  if (field.required) {
    schema = schema.required(
      field.validation?.required || MESSAGES.REQUIRED(field.label)
    );
  }

  return schema;
};

const createDateValidation = (field) => {
  let schema = yup.date().typeError(MESSAGES.INVALID_DATE);

  if (field.required) {
    schema = schema.required(
      field.validation?.required || MESSAGES.REQUIRED(field.label)
    );
  }

  if (field.validation?.max) {
    schema = schema.max(
      field.validation.max,
      field.validation?.maxMessage || MESSAGES.DATE_FUTURE
    );
  }

  if (field.validation?.min) {
    schema = schema.min(
      field.validation.min,
      field.validation?.minMessage || MESSAGES.DATE_PAST
    );
  }

  return schema;
};

const createCheckboxValidation = (field) => {
  let schema = yup.boolean().transform((value) => !!value);

  if (field.required) {
    schema = schema.oneOf(
      [true],
      field.validation?.required || MESSAGES.TERMS_REQUIRED
    );
  }

  return schema;
};

// Main validation schema creator
export const createFormValidationSchema = (fields) => {
  const schema = {};

  Object.entries(fields).forEach(([fieldName, fieldConfig]) => {
    switch (fieldConfig.type) {
      case "email":
        schema[fieldName] = createEmailValidation(fieldConfig);
        break;

      case "tel":
        schema[fieldName] = createPhoneValidation(fieldConfig);
        break;

      case "checkbox":
        schema[fieldName] = createCheckboxValidation(fieldConfig);
        break;

      case "date":
        schema[fieldName] = createDateValidation(fieldConfig);
        break;

      case "select":
      case "radio":
        schema[fieldName] = yup
          .string()
          .required(
            fieldConfig.validation?.required ||
              MESSAGES.REQUIRED(fieldConfig.label)
          );
        break;

      default:
        schema[fieldName] = createStringValidation(fieldConfig);
    }
  });

  return yup.object().shape(schema);
};

// Data transformation helpers
export const transformFormData = (data, fields) => {
  const transformed = { ...data };

  Object.entries(fields).forEach(([fieldName, fieldConfig]) => {
    const value = transformed[fieldName];
    if (value === undefined || value === null) return;

    switch (fieldConfig.type) {
      case "date":
        transformed[fieldName] = new Date(value);
        break;
      case "checkbox":
        transformed[fieldName] = !!value;
        break;
      case "number":
        transformed[fieldName] = value === "" ? null : Number(value);
        break;
      case "tel":
        transformed[fieldName] = value.replace(/\D/g, "");
        break;
    }
  });

  return transformed;
};

// Format data for display or API
export const formatFormData = (data, fields) => {
  const formatted = { ...data };

  Object.entries(fields).forEach(([fieldName, fieldConfig]) => {
    const value = formatted[fieldName];
    if (value === undefined || value === null) return;

    switch (fieldConfig.type) {
      case "date":
        formatted[fieldName] = new Date(value).toISOString().split("T")[0];
        break;
      case "number":
        formatted[fieldName] = value.toString();
        break;
      case "tel":
        // Format phone number: (123) 456-7890
        const cleaned = value.replace(/\D/g, "");
        formatted[fieldName] = cleaned.replace(
          /(\d{3})(\d{3})(\d{4})/,
          "($1) $2-$3"
        );
        break;
    }
  });

  return formatted;
};

// Get default values
export const getFormDefaultValues = (fields) => {
  const defaultValues = {};

  Object.entries(fields).forEach(([fieldName, fieldConfig]) => {
    // Use field's default value if provided
    if (fieldConfig.defaultValue !== undefined) {
      defaultValues[fieldName] = fieldConfig.defaultValue;
      return;
    }

    // Otherwise, use type-specific defaults
    switch (fieldConfig.type) {
      case "checkbox":
        defaultValues[fieldName] = false;
        break;
      case "date":
        defaultValues[fieldName] = "";
        break;
      case "number":
        defaultValues[fieldName] = "";
        break;
      case "select":
      case "radio":
        defaultValues[fieldName] = "";
        break;
      default:
        defaultValues[fieldName] = "";
    }
  });

  return defaultValues;
};

// Validate a single field
export const validateField = async (field, value) => {
  try {
    const schema = createFormValidationSchema({ field: field });
    await schema.validateAt("field", { field: value });
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};
