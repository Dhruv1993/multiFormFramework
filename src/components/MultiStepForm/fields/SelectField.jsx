import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import get from 'lodash/get';

export const SelectField = ({
  fieldName,
  options = [],
  attributes,
  readOnly,
  disabled = false,
  onOptionSelected,
  fireEventName,
  menuPortalTarget = false,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const value = watch(fieldName);
  // Only store the value not the label in the data model
  const existingOption = findExistingValue(options, value);
  const selectedValue = existingOption || (value ? { value, label: value } : null);
  const fieldError =
    get(errors, fieldName, '') ||
    errors[fieldName] ||
    errors[fieldName.trim().split('.').pop()];

  const hasError = Boolean(fieldError);
  const onFieldChange = (option) => {
    try {
      if (fireEventName && fireEventName !== '') {
        // This is a custom event which can be used in other components if they need to listen to this event and perform some action
        const event = new CustomEvent(fireEventName, {
          detail: { option },
        });
        document.dispatchEvent(event); // Dispatch this event globally
      }
      if (option === null) {
        setValue(fieldName, option, { shouldDirty: true });
      } else {
        setValue(fieldName, option.value, { shouldDirty: true });
      }
      if (onOptionSelected) {
        onOptionSelected(existingOption); // Invoke onOptionSelected callback
      }
    } catch (error) {
      console.log('🚀 ~ onFieldChange ~ error:', error);
    }
  };
  const getErrorMessage = (error) => {
    if (!error) return null;

    if (error.message) return error.message;

    for (const key in error) {
      if (typeof error[key] === 'object') {
        const message = getErrorMessage(error[key]);
        if (message) return message;
      }
    }
    return null;
  };
  return (
    <>
      <Select
        {...register(fieldName)}
        isClearable={!readOnly}
        isSearchable={!readOnly}
        menuIsOpen={readOnly ? false : undefined}
        value={selectedValue}
        onChange={onFieldChange}
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        {...(attributes || {})}
        isDisabled={disabled}
        {...(menuPortalTarget && { menuPortalTarget: document.body })}
      />
      {hasError && (
        <div>{getErrorMessage(fieldError)}</div>
      )}
    </>
  );
};

const findExistingValue = (options, value) =>
  options.find((option) => option.value === value);

export default SelectField;