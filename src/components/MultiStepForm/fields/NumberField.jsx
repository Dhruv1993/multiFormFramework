import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Form, FormControl } from 'react-bootstrap'
import get from 'lodash/get'
import { CheckboxField } from './index'

const Container = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 1400px) {
    flex-direction: column;
  }
`

const TextInputFieldViewWrapper = styled.div`
  width: ${({ showCheckbox }) => (showCheckbox ? '50%' : '100%')};
  @media (max-width: 1400px) {
    width: 100%;
  }
`

const CheckboxContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 1400px) {
    width: 110px;
    gap: 5px;
  }
`

const Label = styled(Form.Label)`
  margin: 0;
  white-space: nowrap;
`

const NumberField = React.forwardRef(
    (
      {
        fieldName,
        showCheckbox,
        checkboxFieldName,
        checkboxLabel,
        handleNumberInputFocus,
        ...restProps
      },
      ref
    ) => {
      const {
        register,
        formState: { errors },
        watch,
        setValue,
        getValues,
      } = useFormContext()
      const value = watch(fieldName)
      const fieldError =
        get(errors, fieldName, '') ||
        errors[fieldName] ||
        errors[fieldName.trim().split('.').pop()]

      const hasError = Boolean(fieldError)

      const onFieldChange = ({ target }) =>
        setValue(fieldName, target.value, { shouldDirty: true })

       React.useEffect(() => {
            if (value === undefined) {
              setValue(fieldName, undefined, { shouldDirty: true })
            }
          }, [value])

      return (
        <>
          <Container>
            <TextInputFieldViewWrapper showCheckbox={showCheckbox}>
              <FormControl
                {...register(fieldName)}
                {...restProps}
                {...(restProps.toolTip ? { title: restProps.toolTip } : {})}
                {...(restProps.placeHolderText
                  ? { placeholder: restProps.placeHolderText }
                  : {})}
                {...(restProps.disableAutocomplete
                  ? { autoComplete: 'off' }
                  : {})}
                type='number'
                isInvalid={hasError}
                onChange={onFieldChange}
                value={value ?? ''}
                ref={ref}
                onFocus={
                   handleNumberInputFocus &&
                   handleNumberInputFocus
                }
              />
            </TextInputFieldViewWrapper>
            {showCheckbox && (
              <CheckboxContainer>
                <CheckboxField
                  fieldName={checkboxFieldName || `${fieldName}_checkbox`}
                  readOnly={restProps?.readOnly}
                />
                <Label>{checkboxLabel || 'Checkbox Label'}</Label>
              </CheckboxContainer>
            )}
          </Container>
          {hasError && <Form.Control.Feedback type="invalid">{fieldError.message}</Form.Control.Feedback>}
        </>
      )
    }
  )

export default NumberField;
