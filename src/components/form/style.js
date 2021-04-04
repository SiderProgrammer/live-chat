import styled from "styled-components";

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  text-align: center;
  width: 30%;

  & > div {
    display: flex;
    flex-direction: column;
  }

  & > div > input {
    padding: var(--form-interactive-elements-padding);
    font-size: 20px;
  }
`;
