import { useAuthState } from "react-firebase-hooks/auth";

import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOutButton from "./components/SignOutButton";
import ChatRoom from "./components/ChatRoom";

import { auth } from "./firebase/init";

import { ToastProvider } from "react-toast-notifications";
function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Live chat</h1>
        {user && <SignOutButton />}
      </header>

      <section>
        {user ? (
          <ChatRoom />
        ) : (
          <BrowserRouter>
            <ToastProvider>
              <Route path="/" exact component={SignIn} />

              <Route path="/SignUp" exact component={SignUp} />
            </ToastProvider>
          </BrowserRouter>
        )}
      </section>
    </div>
  );
}

export default App;
