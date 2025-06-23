import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { askCryptoAI } from "../config/askCryptoAI";

const AskAIChat = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input.trim();
    setChat((prev) => [...prev, { type: "user", message: question }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askCryptoAI(question);
      setChat((prev) => [...prev, { type: "ai", message: reply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { type: "ai", message: "⚠️ Error: Please try again." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0d1117",
        p: 2,
        maxWidth: "700px",
        mx: "auto",
        color: "#fff",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 700,
          textAlign: "center",
          color: "#f0db4f",
        }}
      >
        🤖 Ask Crypto AI
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {chat.map((msg, i) => (
          <Box
            key={i}
            sx={{
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                bgcolor: msg.type === "user" ? "#1f6feb" : "#21262d",
                color: msg.type === "user" ? "#fff" : "#c9d1d9",
                borderRadius:
                  msg.type === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                fontFamily: msg.type === "ai" ? "monospace" : "inherit",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.message}
            </Paper>
          </Box>
        ))}

        {loading && (
          <Box sx={{ alignSelf: "flex-start" }}>
            <CircularProgress size={20} sx={{ color: "#f0db4f" }} />
          </Box>
        )}

        <div ref={scrollRef} />
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          variant="outlined"
          placeholder="Ask about cryptocurrency..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              bgcolor: "#161b22",
              "& fieldset": { borderColor: "#30363d" },
              "&:hover fieldset": { borderColor: "#444c56" },
              "&.Mui-focused fieldset": { borderColor: "#f0db4f" },
            },
            textarea: { color: "#fff" },
          }}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          variant="contained"
          sx={{
            borderRadius: "20px",
            px: 2,
            minWidth: "80px",
            bgcolor: "#f0db4f",
            color: "#000",
            fontWeight: 600,
            "&:disabled": {
              bgcolor: "#2c2f33",
              color: "#7f8c8d",
            },
            "&:hover": {
              bgcolor: "#ffeb3b",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AskAIChat;
