import { CircularProgress } from "@mui/material";
import React from "react";

function Loader({ className = "" }) {
  return (
    <CircularProgress className={className} style={{ color: "#0c4a6e" }} />
  );
}

export default Loader;
