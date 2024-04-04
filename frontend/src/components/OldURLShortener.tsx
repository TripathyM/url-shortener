import {
  Paper,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import config from "../config/config";
import isURL from "validator/es/lib/isURL";


const URLShortener = () => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [actualUrl, setActualUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);

  useEffect(() => {
    setIsValidUrl(isURL(actualUrl));
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
  );
};

export default URLShortener;
