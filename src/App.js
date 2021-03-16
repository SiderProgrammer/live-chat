import { useRef, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOutButton from "./components/SignOutButton";

import { auth, firestore, storage } from "./firebase/init";
import { getServerTimestamp } from "./firebase/functions";

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
            <Route path="/" exact component={SignIn} />
            <Route path="/SignUp" exact component={SignUp} />
          </BrowserRouter>
        )}
      </section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(30);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [file, setFile] = useState(null);

  const { uid, photoURL } = auth.currentUser;

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: getServerTimestamp(),
      uid,
      photoURL,
    });

    dummy.current.scrollIntoView({ behaviour: "smooth" });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();

    const upload = storage.ref("images").child(uid).put(file);
    upload.on("state_changed", () => {});
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <main>
        chat room
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="type your message here"
          />
          <button type="submit" disabled={!formValue}>
            send
          </button>
        </form>
        <form onSubmit={handleFileUpload}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </main>
    </>
  );
}

function ChatMessage(info) {
  const { photoURL, text } = info.message;
  // const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
