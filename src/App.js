import { useAuthState } from "react-firebase-hooks/auth";

import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import SignOutButton from "./components/SignOutButton";
import ChatRoom from "./components/chatRoom/ChatRoom";

import { auth } from "./firebase/init";

import { ToastProvider } from "react-toast-notifications";

import { GlobalStyles } from "./components/styles/global";
import { AuthSection } from "./components/styles/Section.js";
import { Wrapper } from "./components/styles/Div";
import { PageHeader } from "./components/styles/Header";
function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <PageHeader>
          {user ? <h1>Live chat room </h1> : <h1>Live chat main page</h1>}
        </PageHeader>

        <AuthSection>
          <ToastProvider>
            {user ? (
              <>
                <div
                  style={{
                    padding: "20px",
                    background: "white",
                    border: "3px solid mediumseagreen",
                  }}
                >
                  <SignOutButton />
                </div>

                <ChatRoom />
              </>
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
