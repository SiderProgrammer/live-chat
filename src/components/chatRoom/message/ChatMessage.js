import { Message, CurrentUserMessage } from "../../styles/Div";
import { auth } from "../../../firebase/init";
import MessageContent from "./MessageContent";

function ChatMessage(info) {
  const currentUserUID = auth.currentUser.uid;

  const { uid } = info.message;
  const isCurrentUser = currentUserUID === uid;

  // const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      {!isCurrentUser && (
        <Message>
          <MessageContent prop={info} />
        </Message>
      )}

      {isCurrentUser && (
        <CurrentUserMessage>
          <MessageContent prop={info} />
        </CurrentUserMessage>
      )}
    </>
  );
}

export default ChatMessage;
