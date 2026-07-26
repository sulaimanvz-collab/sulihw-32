import { useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { createMessage, fetchMessages } from "./store/messagesThunks";
import {
  selectCreateLoading,
  selectFetchLoading,
  selectMessages,
} from "./store/messagesSlice";
import { MessageForm } from "./components/MessageForm";
import { MessageItem } from "./components/MessageItem";
import type { MessageMutation } from "./types";

export const App = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const createLoading = useAppSelector(selectCreateLoading);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const onFormSubmit = async (messageMutation: MessageMutation) => {
    await dispatch(createMessage(messageMutation));
    await dispatch(fetchMessages());
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 800, color: "#1a202c", letterSpacing: "-0.5px" }}
        >
          Guestbook
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 700, color: "#2d3748" }}
        >
          New Post
        </Typography>
        <MessageForm onSubmit={onFormSubmit} isLoading={createLoading} />
      </Paper>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {fetchLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : messages.length > 0 ? (
          messages
            .slice()
            .reverse()
            .map((msg) => <MessageItem key={msg.id} message={msg} />)
        ) : (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              color: "text.secondary",
            }}
          >
            No messages yet. Be the first to leave one!
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default App;
