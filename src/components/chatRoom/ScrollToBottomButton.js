import "./ScrollToBottom.css";
function ScrollToBottomButton({ scrollToBottom }) {
  return (
    <button className="scrollToBottomButton" onClick={scrollToBottom}>
      Scroll To bottom
    </button>
  );
}

export default ScrollToBottomButton;
