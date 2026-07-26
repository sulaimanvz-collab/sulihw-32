import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import type { MessageMutation } from "../types";
import { FileInput } from "./FileInput";

interface Props {
  onSubmit: (message: MessageMutation) => void;
  isLoading: boolean;
}

export const MessageForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState<MessageMutation>({
    author: "",
    message: "",
    image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.message.trim()) return;

    onSubmit(state);
    setState({
      author: "",
      message: "",
      image: null,
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setState((prevState) => ({ ...prevState, [name]: files[0] }));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitFormHandler}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      <TextField
        label="Author"
        name="author"
        value={state.author}
        onChange={inputChangeHandler}
        fullWidth
        placeholder="Anonymous"
        variant="outlined"
        size="small"
      />
      <TextField
        label="Message"
        name="message"
        value={state.message}
        onChange={inputChangeHandler}
        required
        multiline
        rows={3}
        fullWidth
        placeholder="Type your message here..."
        variant="outlined"
      />
      <FileInput
        onChange={fileChangeHandler}
        name="image"
        label="Attach image (optional)"
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        endIcon={<SendIcon />}
        sx={{
          alignSelf: "flex-start",
          px: 3,
          py: 1,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
          backgroundColor: "#3182ce",
          "&:hover": { backgroundColor: "#2b6cb0" },
        }}
      >
        {isLoading ? "Posting..." : "Post Message"}
      </Button>
    </Box>
  );
};
