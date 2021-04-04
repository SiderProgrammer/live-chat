import { useRef, useState, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getServerTimestamp } from "../../firebase/functions";
import { auth, firestore, storage } from "../../firebase/init";
import ScrollToBottomButton from "./ScrollToBottomButton";
import ChatMessage from "./message/ChatMessage";
import { useToasts } from "react-toast-notifications";
import { ChatWrapper } from "../styles/Main";
import "./ChatRoom.css";

const FILE_TYPE_ERROR_MESSAGE = "Oops.. only graphic files are correct";

function ChatRoom() {
  const messagesCollection = firestore.collection("messages");
  const query = messagesCollection.orderBy("createdAt"); //.limit(30);
  const [messages] = useCollectionData(query, { idField: "id" });

  const bottom = useRef();
  const [formValue, setFormValue] = useState("");
  const [atBottom, setAtBottom] = useState(true);

  const { addToast } = useToasts();

  const html = document.querySelector("html");

  function handleScroll() {
    if (html.scrollHeight - html.scrollTop - 300 > html.clientHeight) {
      setAtBottom(false);
    } else {
      setAtBottom(true);
    }
  }
  function scrollToBottom() {
    bottom.current.scrollIntoView({ behaviour: "smooth" });
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { uid, photoURL } = auth.currentUser;

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
    setFormValue("");
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
      () => {
        addToast(FILE_TYPE_ERROR_MESSAGE, {
          appearance: "error",
          autoDismiss: true,
          //placement: "bottom-right",
        });
      },
      async () => {
        const imgURL = await storage.ref("images").child(uid).getDownloadURL();
        sendMessage(e, imgURL, "img");
      }
    );
  };

  return (
    <>
      {!atBottom && <ScrollToBottomButton scrollToBottom={scrollToBottom} />}
      <ChatWrapper>
        chat room
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <form onSubmit={(e) => sendMessage(e, formValue, "text")}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="type your message here"
            maxLength="100"
          />
          <button type="submit" disabled={!formValue}>
            <BiSend />
          </button>
        </form>
        <BsFillImageFill
          onClick={function () {
            document.querySelector("#fileUpload").click();
          }}
        ></BsFillImageFill>
        <input
          type="file"
          onChange={handleFileUpload}
          id="fileUpload"
          accept="image/*"
        />
        <span ref={bottom}></span>
      </ChatWrapper>
    </>
  );
}

export default ChatRoom;
