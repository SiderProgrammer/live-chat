import { useRef, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyB0mA_-HvSm67ccWdUbTVaZJi2EAgVRAAQ",
  authDomain: "live-chat-4e642.firebaseapp.com",
  projectId: "live-chat-4e642",
  storageBucket: "live-chat-4e642.appspot.com",
  messagingSenderId: "650509778838",
  appId: "1:650509778838:web:4cac4df077125915b0a7b7",
  measurementId: "G-C75ST1Z7BM",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        {user && <SignOut />}
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  );
}

function SignOut() {
  const signOutWithGoogle = () => {
    auth.signOut();
  };

  return <button onClick={signOutWithGoogle}>Sign Out</button>;
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(30);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    dummy.current.scrollIntoView({ behaviour: "smooth" });
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
