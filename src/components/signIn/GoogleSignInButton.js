import { signInWithGoogle } from "../../firebase/functions";
import { GoogleButton } from "../button/style";
function SignInGoogleButton() {
  return (
    <GoogleButton onClick={signInWithGoogle}>Sign in with Google</GoogleButton>
  );
}

export default SignInGoogleButton;
