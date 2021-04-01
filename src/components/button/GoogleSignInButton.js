import { signInWithGoogle } from "../../firebase/functions";

function SignInGoogleButton() {
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default SignInGoogleButton;
