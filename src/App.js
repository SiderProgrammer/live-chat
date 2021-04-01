import { useAuthState } from "react-firebase-hooks/auth";

import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import SignOutButton from "./components/button/SignOutButton";
import ChatRoom from "./components/chatRoom/ChatRoom";

import { auth } from "./firebase/init";

import { ToastProvider } from "react-toast-notifications";
import "./App.css";
function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Live chat</h1>
        {user && <SignOutButton />}
      </header>

      <section>
        <ToastProvider>
          {user ? (
            <ChatRoom />
          ) : (
            <BrowserRouter>
              <Route path="/" exact component={SignIn} />

              <Route path="/SignUp" exact component={SignUp} />
            </BrowserRouter>
          )}
        </ToastProvider>
      </section>
    </div>
  );
}

export default App;
