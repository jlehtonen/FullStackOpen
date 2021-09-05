import { useState } from "react";
import styled from "styled-components";

export const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [{ type, value, onChange }, reset];
};

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.7rem;
`;

const Label = styled.label`
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.7rem 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #444;
`;

const Field = ({ label, type, value, onChange, id }) => {
  return (
    <FieldContainer>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={onChange} />
    </FieldContainer>
  );
};

export default Field;
