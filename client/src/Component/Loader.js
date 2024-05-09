import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { wHeight } from "../Constant/general";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: wHeight,
        minHeight: wHeight,
        justifyContent: "center",
        margin: "0px 60px",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
