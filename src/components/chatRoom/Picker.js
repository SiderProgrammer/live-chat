import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const StyledPicker = ({ onSelect }) => {
  return (
    <Picker
      onSelect={onSelect}
      theme={"dark"}
      style={{ alignSelf: "flex-end", marginRight: "30px" }}
    />
  );
};

export default StyledPicker;
