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
import URLShortener from "../components/URLShortener";
import { useEffect, useState } from "react";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ConstructionIcon from "@mui/icons-material/Construction";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HowItWorks from "../components/HowItWorks";
import AboutMe from "../components/AboutMe";
import config from "../config/config";
import Loader from "../components/Loader";

const Home = () => {
  const theme = useTheme();
  const [value, setValue] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${config.BACKEND_BASE_URL}/healthz`)
      .then((res) => res.json())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

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
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            position: "absolute",
            height: { xs: "0.7", md: "0.4" },
            width: "80%",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                icon={tab.icon}
                label={tab.label}
                value={tab.value}
                sx={{ fontSize: "0.8rem", py: 2 }}
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
            {value === 1 && <URLShortener />}
            {value === 2 && <HowItWorks />}
            {value === 3 && <AboutMe />}
          </Paper>
        </Box>
      )}
    </>
  );
};

export default Home;
