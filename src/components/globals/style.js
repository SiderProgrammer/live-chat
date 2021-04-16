import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
html{
    --button-green:mediumseagreen;
    --form-interactive-elements-padding:3px;
}


    input[type="file"] {
        color: rgba(0, 0, 0, 0);
      }

      @keyframes shake {
        10%, 90% {
          transform: translate3d(-1px, 0, 0);
        }
        
        20%, 80% {
          transform: translate3d(2px, 0, 0);
        }
      
        30%, 50%, 70% {
          transform: translate3d(-4px, 0, 0);
        }
      
        40%, 60% {
          transform: translate3d(4px, 0, 0);
        
      }

`;
