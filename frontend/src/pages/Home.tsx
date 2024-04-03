import { Button, Link, TextField } from "@mui/material";
import { useState } from "react";

const Home = () => {
  const [actualUrl, setActualUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting", actualUrl);
    fetch(`http://localhost:3000/link`, {
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
    <>
      <form aria-label="urls-form" onSubmit={handleSubmit}>
        <TextField
          label="Enter URL"
          variant="outlined"
          value={actualUrl}
          onChange={(e) => setActualUrl(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Shorten
        </Button>

        <Link href={shortUrl} target="_blank">
          {shortUrl}
        </Link>
      </form>
    </>
  );
};

export default Home;
