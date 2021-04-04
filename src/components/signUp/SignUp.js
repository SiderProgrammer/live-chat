import { useRef } from "react";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../signIn/GoogleSignInButton";
import { createUserWithEmailAndPassword } from "../../firebase/functions";
import { useToasts } from "react-toast-notifications";
import { FormButton } from "../button/style";
import { AuthForm } from "../form/style";
import { AccountParagraph } from "../styles/Paragraph";
const INVALID_EMAIL_CODE = "auth/invalid-email";
const INVALID_PASSWORD_LENGTH_CODE = "auth/weak-password";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { addToast } = useToasts();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value)
      return;

    try {
      await createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );

      // eslint-disable-next-line no-empty
    } catch (e) {
      if (e.code === INVALID_EMAIL_CODE) {
        addToast(e.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      if (e.code === INVALID_PASSWORD_LENGTH_CODE) {
        addToast(e.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }

  return (
    <>
      <AuthForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            ref={emailRef}
            placeholder="Your email"
            required
          />
        </div>

        <div>
          <label htmlFor="userPassword"> Password:</label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Your password"
            required
          />
        </div>

        <div>
          <label>Password Confirmation</label>
          <input
            type="password"
            ref={passwordConfirmationRef}
            required
            placeholder="Repeat your password"
          />
        </div>
        <FormButton type="submit"> Sign Up</FormButton>
      </AuthForm>
      <p>or</p>
      <GoogleSignInButton />
      <AccountParagraph>
        Already have an account?
        <Link to="/">Sign in here</Link>{" "}
      </AccountParagraph>
    </>
  );
}

export default SignUp;
