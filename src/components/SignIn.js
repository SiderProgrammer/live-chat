import { useRef } from "react";
import { Link } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";
import { signInWithEmailAndPassword } from "../firebase/functions";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    );
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
      <p>Forgot password?</p>
    </>
  );
}

export default SignIn;
