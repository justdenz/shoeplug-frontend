import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Spinner() {
  return (
    <div className="min-h-[calc(100vh-5.75rem)] justify-items-center content-center">
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="inherit" />
      </Box>
    </div>
  );
}
