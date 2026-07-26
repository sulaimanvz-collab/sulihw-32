import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import type { Message } from "../types";
import { apiURL } from "../constants";

interface Props {
  message: Message;
}

export const MessageItem: React.FC<Props> = ({ message }) => {
  const imageUrl = message.image ? `${apiURL}/${message.image}` : null;

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "#cbd5e0",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
        },
        overflow: "hidden",
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: 160 },
            height: { xs: 200, sm: "auto" },
            objectFit: "cover",
          }}
          image={imageUrl}
          alt={message.author}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 1 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Avatar
              sx={{
                bgcolor: "#3182ce",
                width: 32,
                height: 32,
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              {message.author.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#2d3748" }}
            >
              {message.author}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{ color: "#4a5568", lineHeight: 1.6, whitespace: "pre-line" }}
          >
            {message.message}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
