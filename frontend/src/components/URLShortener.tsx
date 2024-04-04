import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Button,
  Grid,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import isURL from "validator/es/lib/isURL";
import config from "../config/config";

const URLSho = () => {
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <form
          noValidate
          autoComplete="off"
          aria-label="urls-form"
          onSubmit={handleSubmit}
        >
          <Grid item xs={12}>
            <Typography
              variant="body1"
              fontSize={35}
              gutterBottom
              fontWeight="bold"
            >
              Shorten a long link
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              fontSize={25}
              gutterBottom
              fontWeight="bold"
            >
              Insert a lengthy URL
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              placeholder="Enter your long link starting with http:// or https:// to enable the button"
              value={actualUrl}
              onChange={(e) => {
                setShortUrl("");
                setActualUrl(e.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            container
            justifyContent={"flex-start"}
            sx={{ mt: "20px" }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ height: "54px" }}
              disabled={!isValidUrl}
            >
              Shorten URL
            </Button>
          </Grid>
        </form>
      </Grid>

      {shortUrl && (
        <Grid item xs={12}>
          <Typography variant="body1" fontSize={20} display="inline">
            Shortened URL:{" "}
          </Typography>

          <Link
            href={shortUrl}
            target="_blank"
            sx={{ fontSize: "20px", pl: "px", ml: "5px" }}
          >
            {shortUrl}
          </Link>

          <Tooltip title="Copy">
            <IconButton onClick={handleCopy} size="small" sx={{ m: "20px" }}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};

export default URLSho;
