import { useRef } from "react";
import { Link } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";
import { signInWithEmailAndPassword } from "../../firebase/functions";
import { useToasts } from "react-toast-notifications";
import { FormButton } from "../button/style";
import { AuthForm } from "../form/style";
import { AccountParagraph } from "../styles/Paragraph";

const LOGIN_IN_ERROR_MESSAGE = "Oops.. E-mail or password is incorrect :(";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).catch(() => {
      addToast(LOGIN_IN_ERROR_MESSAGE, {
        appearance: "error",
        autoDismiss: true,
      });
    });
  };
  return (
    <>
      <AuthForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            ref={emailRef}
            placeholder="Your email"
          />
        </div>

        <div>
          <label htmlFor="userPassword"> Password:</label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            ref={passwordRef}
            placeholder="Your password"
          />
        </div>
        <FormButton type="submit"> Sign in</FormButton>
      </AuthForm>

      <p>or</p>
      <GoogleSignInButton />

      <AccountParagraph>
        {"Don't have an account?"} <Link to="SignUp">Sign up here</Link>
      </AccountParagraph>
    </>
  );
}

export default SignIn;
