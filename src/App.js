import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOutButton from "./components/SignOutButton";
import ChatRoom from "./components/ChatRoom";

import { auth } from "./firebase/init";

function App() {
  const [user] = useAuthState(auth);
  const [isGuest, setGuest] = useState(false);
  return (
    <div className="App">
      <header>
        <h1>Live chat</h1>
        {(user || isGuest) && <SignOutButton />}
      </header>

      <section>
        {user || isGuest ? (
          <ChatRoom />
        ) : (
          <BrowserRouter>
            <Route path="/" exact>
              <SignIn setGuest={setGuest} />{" "}
              {/*could use withRouter to not clear match,loc,his props*/}
            </Route>

            <Route path="/SignUp" exact component={SignUp} />
          </BrowserRouter>
        )}
      </section>
    </div>
  );
}

export default App;
