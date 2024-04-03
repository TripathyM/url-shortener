import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import config from "../config/config";
import RecentLinks from "../components/RecentLinks";

// Manish - Move to separate types file
type LinksResponse = {
  actualUrl: string;
  shortUrl: string;
};

const Home = () => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [actualUrl, setActualUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [recentUrls, setRecentUrls] = useState<LinksResponse[]>([]);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${config.BACKEND_BASE_URL}/recentLinks`)
      .then((res) => res.json())
      .then(setRecentUrls);
  }, [shortUrl]);

  useEffect(() => {
    try {
      new URL(actualUrl);
      setIsValidUrl(true);
    } catch (e) {
      setIsValidUrl(false);
    }
  }, [actualUrl]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(config.BACKEND_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actualUrl }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setShortUrl(data.shortUrl);
        });
      }
    });
  };

  return (
    <Container>
      <Paper elevation={2} data-testid="url-shortener-section">
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              URL Shortener
            </Typography>
            <form
              noValidate
              autoComplete="off"
              aria-label="urls-form"
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={10}>
                  <TextField
                    label="Enter URL"
                    variant="outlined"
                    placeholder="Enter your long link starting with http:// or https://"
                    value={actualUrl}
                    onChange={(e) => setActualUrl(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  container
                  justifyContent={isXsScreen ? "center" : "flex-start"}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ height: "54px" }}
                    disabled={!isValidUrl}
                  >
                    Shorten
                  </Button>
                </Grid>

                {shortUrl && (
                  <Grid item xs={12}>
                    <Typography variant="body1" display="inline">
                      Shortened URL:{" "}
                    </Typography>

                    <Link href={shortUrl} target="_blank">
                      {shortUrl}
                    </Link>
                  </Grid>
                )}
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Paper>

      <Divider sx={{ my: 2 }} />
      <RecentLinks recentUrls={recentUrls} />
    </Container>
  );
};

export default Home;
