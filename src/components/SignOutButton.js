import { signOut } from "../firebase/functions";

function SignOutButton() {
  return <button onClick={signOut}>Sign Out</button>;
}

export default SignOutButton;
