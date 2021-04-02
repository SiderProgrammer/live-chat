import { useRef } from "react";
import { Link } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";
import { signInWithEmailAndPassword } from "../../firebase/functions";
import { useToasts } from "react-toast-notifications";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="userEmail">Email:</label>
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          ref={emailRef}
          placeholder="Your email"
        />

        <label htmlFor="userPassword"> Password:</label>
        <input
          type="password"
          name="userPassword"
          id="userPassword"
          ref={passwordRef}
          placeholder="Your password"
        />
        <button type="submit"> Sign in</button>
      </form>

      <p>or</p>
      <GoogleSignInButton />

      <p>
        {"Don't have an account?"} <Link to="SignUp">Sign up here</Link>
      </p>
    </>
  );
}

export default SignIn;
