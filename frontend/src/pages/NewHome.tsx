import {
  AppBar,
  Box,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import URLSho from "../components/URLShortener";
import { useState } from "react";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ConstructionIcon from "@mui/icons-material/Construction";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HowItWorks from "../components/HowItWorks";
import AboutMe from "../components/AboutMe";

const NewHome = () => {
  const theme = useTheme();
  const [value, setValue] = useState(1);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "Shorten URL", icon: <AddLinkIcon />, value: 1 },
    { label: "How it works!", icon: <ConstructionIcon />, value: 2 },
    { label: "About me", icon: <PersonPinIcon />, value: 3 },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.8) }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          position: "absolute",
          height: 0.4,
          width: "calc(100% - 400px)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              icon={tab.icon}
              label={tab.label}
              value={tab.value}
              sx={{ fontSize: "1.2rem", py: 2 }}
            />
          ))}
        </Tabs>
        <Paper
          elevation={6}
          sx={{
            borderRadius: "20px",
            padding: "50px",
            height: "100%",
          }}
        >
          {value === 1 && <URLSho />}
          {value === 2 && <HowItWorks />}
          {value === 3 && <AboutMe />}
        </Paper>
      </Box>
    </>
  );
};

export default NewHome;
