import React, { forwardRef } from 'react'
import StyledForm from './styles'

const Select = forwardRef(({ children, onChange, onBlur, name, label }, ref) => {
  return (
    <>
      <label htmlFor='countries'>{label}</label>
      <StyledForm.SelectWrapper>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {children}
        </select>
      </StyledForm.SelectWrapper>
    </>
  )
})

Select.displayName = 'Select'

const Form = ({ children, onSubmit, title, ...rest }) => {
  return (
    <>
      <StyledForm.Container {...rest}>
        {title && <h1>{title}</h1>}
        <StyledForm.Form onSubmit={onSubmit}>
          <StyledForm.InputFields>
            {children}
          </StyledForm.InputFields>
        </StyledForm.Form>
      </StyledForm.Container>
    </>
  )
}

export default Form
export { Select }
