import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import type { Message } from "../types";
import { apiURL } from "../constants";

interface Props {
  message: Message;
}

export const MessageItem: React.FC<Props> = ({ message }) => {
  const imageUrl = message.image ? `${apiURL}/${message.image}` : null;

  return (
    <Card sx={{ display: "flex", mb: 2, p: 1 }}>
      {imageUrl && (
        <CardMedia
          component="img"
          sx={{ width: 140, height: 140, objectFit: "cover", borderRadius: 1 }}
          image={imageUrl}
          alt={message.author}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent>
          <Typography component="div" variant="h6">
            {message.author}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {message.message}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
