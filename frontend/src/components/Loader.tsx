import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => (
  <Backdrop
    open={true}
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" color="inherit">
        Waking up the server, hang tight...
      </Typography>
    </Box>
  </Backdrop>
);

export default Loader;
