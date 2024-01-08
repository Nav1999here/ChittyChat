import React, { useState } from "react";
import { Box, Input, Textarea, IconButton } from "@chakra-ui/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiInput = ({ value, onChange }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleEmojiSelect = (emoji) => {
    console.log(emoji, "emoji");
    //setSelectedEmoji(emoji.native);

    setSelectedEmoji((prevValue) => prevValue + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <Box>
      <Input
        value={selectedEmoji}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        borderRadius="md"
        marginBottom="2"
        paddingRight="8" // Adjust the right padding to make space for the emoji picker icon
      />
      <IconButton
        aria-label="Open Emoji Picker"
        icon="emoji" // Replace with your emoji icon or any other way you want to trigger the emoji picker
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />
      {showEmojiPicker && (
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          style={{ position: "absolute", bottom: "50px", right: "0" }}
        />
      )}
    </Box>
  );
};

export default EmojiInput;
