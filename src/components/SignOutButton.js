import { signOut } from "../firebase/functions";
import { GoogleButton } from "./button/style";

function SignOutButton() {
  return <GoogleButton onClick={signOut}>Sign Out</GoogleButton>;
}

export default SignOutButton;
