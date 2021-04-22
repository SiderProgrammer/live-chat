import { ScrollButton } from "../styles/Buttons";
function ScrollToBottomButton({ scrollToBottom }) {
  return (
    <ScrollButton className="scrollToBottomButton" onClick={scrollToBottom}>
      Scroll To bottom
    </ScrollButton>
  );
}

export default ScrollToBottomButton;
