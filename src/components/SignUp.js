import { useRef } from "react";
import { Link } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";
import { createUserWithEmailAndPassword } from "../firebase/functions";
// import { useToasts } from "react-toast-notifications";

// const LOGIN_IN_ERROR_MESSAGE = "Oops.. E-mail or password is incorrect :(";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
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
      console.log(e);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userEmail">Email:</label>
        <input type="email" ref={emailRef} placeholder="Your email" required />

        <label htmlFor="userPassword"> Password:</label>
        <input
          type="password"
          ref={passwordRef}
          placeholder="Your password"
          required
        />

        <label>Password Confirmation</label>
        <input
          type="password"
          ref={passwordConfirmationRef}
          required
          placeholder="Repeat your password"
        />

        <button type="submit"> Sign Up</button>
      </form>
      <p>or</p>
      <GoogleSignInButton />
      <p>
        Already have an account?
        <Link to="/">Sign in here</Link>{" "}
      </p>
    </>
  );
}

export default SignUp;
