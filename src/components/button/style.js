import styled from "styled-components";

export const GoogleButton = styled.button`
  color: var(--button-green);
  border: 2px solid var(--button-green);
  background: none;
  font-size: 1em;
  margin: 1em;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: transform 0.5s;
  width: fit-content;
  margin: 0;

  &:hover {
    transform: scale(1.2);
    color: white;
    border: 2px solid green;
    background: var(--button-green);
  }
`;

export const FormButton = styled.button`
  background: none;
  color: black;
  border: 2px solid black;
  cursor: pointer;
  padding: var(--form-interactive-elements-padding);

  &:hover {
    
      animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
    
   
  }
`;

// color: ${(props) => props.theme.fc};
// border:${props=>props.theme.bc};
// background:${props=>props.theme.bc}
