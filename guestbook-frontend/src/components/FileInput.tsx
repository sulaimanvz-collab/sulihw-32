import React, { useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

export const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        name={name}
        style={{ display: "none" }}
        ref={inputRef}
        onChange={onFileChange}
      />
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          disabled
          label={label}
          value={filename}
          fullWidth
          onClick={activateInput}
          sx={{ cursor: "pointer" }}
        />
        <Button
          variant="contained"
          onClick={activateInput}
          sx={{ height: "56px" }}
        >
          Browse
        </Button>
      </Box>
    </>
  );
};
