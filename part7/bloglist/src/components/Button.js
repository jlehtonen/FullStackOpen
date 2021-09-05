import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ secondary }) => (secondary ? "#f4e3ff" : "#6a1b9a")};
  color: ${({ secondary }) => (secondary ? "#6a1b9a" : "white")};
  border: none;
  padding: ${({ small }) => (small ? "0.3rem 0.7rem" : "0.75rem 1.5rem")};
  border-radius: ${({ small }) => (small ? "0.2rem" : "0.3rem")};
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: ${({ fullwidth }) => (fullwidth ? "100%" : "auto")};

  :hover {
    background-color: ${({ secondary }) => (secondary ? "#efd6ff" : "#581780")};
  }
`;

export default Button;
