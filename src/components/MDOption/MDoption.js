import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function MDOption({ label = "Opción", onDelete }) {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return <Chip label={label} variant="outlined" onDelete={handleDelete} />;
}
