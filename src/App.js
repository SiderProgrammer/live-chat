import { useAuthState } from "react-firebase-hooks/auth";

import { BrowserRouter, Route } from "react-router-dom";
import "./components/globals/style";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import SignOutButton from "./components/SignOutButton";
import ChatRoom from "./components/chatRoom/ChatRoom";

import { auth } from "./firebase/init";

import { ToastProvider } from "react-toast-notifications";
import "./App.css";
import { GlobalStyles } from "./components/globals/style";
import { AuthSection } from "./components/styles/Section.js";
import { Wrapper } from "./components/styles/Div";
function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <header>
          <h1>Live chat</h1>
          {user && <SignOutButton />}
        </header>

        <AuthSection>
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
        </AuthSection>
      </Wrapper>
    </>
  );
}

export default App;
