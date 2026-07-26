import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
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
      sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Author"
        name="author"
        value={state.author}
        onChange={inputChangeHandler}
        fullWidth
        placeholder="Anonymous"
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
      />
      <FileInput onChange={fileChangeHandler} name="image" label="Image" />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ alignSelf: "flex-start" }}
      >
        Send
      </Button>
    </Box>
  );
};
