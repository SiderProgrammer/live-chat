import { signInWithGoogle } from "../firebase/functions";
import { GoogleButton } from "./styles/Buttons";
function SignInGoogleButton() {
  return (
    <GoogleButton onClick={signInWithGoogle}>Sign in with Google</GoogleButton>
  );
}

export default SignInGoogleButton;
