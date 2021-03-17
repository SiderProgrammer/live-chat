function ChatMessage(info) {
  const { photoURL, content, type } = info.message;
  // const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div>
        <img src={photoURL} />

        {type === "text" ? <p>{content}</p> : <img src={content} />}
      </div>
    </>
  );
}

export default ChatMessage;
