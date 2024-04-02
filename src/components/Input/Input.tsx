import { Col, Form } from "react-bootstrap";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  register: UseFormRegisterReturn;
  type?: React.HTMLInputTypeAttribute;
  isValid: boolean;
  errorMessage?: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

const Input = (props: IProps) => {
  const {
    register,
    type,
    errorMessage,
    isValid,
    label,
    placeholder,
    disabled,
  } = props;
  return (
    <Form.Group as={Col} className="mb-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register}
        isInvalid={!isValid}
        placeholder={placeholder}
        disabled={disabled}
      />

      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
