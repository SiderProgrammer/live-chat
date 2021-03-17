import { useRef, useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getServerTimestamp } from "../firebase/functions";
import { auth, firestore, storage } from "../firebase/init";

import ChatMessage from "./ChatMessage";

function ChatRoom() {
  const messagesCollection = firestore.collection("messages");
  const query = messagesCollection.orderBy("createdAt"); //.limit(30);
  const [messages] = useCollectionData(query, { idField: "id" });

  const bottom = useRef();
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    bottom.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  let uid, photoURL;

  if (auth.currentUser) {
    uid = auth.currentUser.uid;
    photoURL = auth.currentUser.photoURL;
  }
  const updateMessagesCollection = (content, type) => {
    return messagesCollection.add({
      content,
      createdAt: getServerTimestamp(),
      uid,
      photoURL,
      type,
    });
  };

  const sendMessage = async (e, content, type) => {
    e.preventDefault();
    await updateMessagesCollection(content, type);
    bottom.current.scrollIntoView({ behaviour: "smooth" });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const upload = storage.ref("images").child(uid).put(file);
    upload.on(
      "state_changed",
      null,
      (err) => {
        console.log("It is not image!" + err.message);
      },
      async () => {
        const imgURL = await storage.ref("images").child(uid).getDownloadURL();
        sendMessage(e, imgURL, "img");
      }
    );
  };

  return (
    <>
      <main>
        chat room
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <form onSubmit={(e) => sendMessage(e, formValue, "text")}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="type your message here"
          />
          <button type="submit" disabled={!formValue}>
            send
          </button>
        </form>
        <input type="file" onChange={handleFileUpload} accept="image/*" />
        <span ref={bottom}></span>
      </main>
    </>
  );
}

export default ChatRoom;
