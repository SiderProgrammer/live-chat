import { signOut } from "../firebase/functions";
import { GoogleButton } from "./styles/Buttons";

function SignOutButton() {
  return <GoogleButton onClick={signOut}>Sign Out</GoogleButton>;
}

export default SignOutButton;
