// import { useEffect, useState } from "react";
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
// import config from "../config/config";

type LinksResponse = {
  actualUrl: string;
  shortUrl: string;
};

const RecentLinks = ({ recentUrls }: { recentUrls: LinksResponse[] }) => {
  // const [recentUrls, setRecentUrls] = useState<LinksResponse[]>([]);

  // useEffect(() => {
  //   fetch(`${config.BACKEND_BASE_URL}/recentLinks`)
  //     .then((res) => res.json())
  //     .then(setRecentUrls);
  // }, []);

  return (
    <Box>
      <Paper elevation={2}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Recently Shortened Links
          </Typography>
          <Box>
            <List>
              {recentUrls.map((url, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <Link href={url.shortUrl} target="_blank">
                        {url.shortUrl}
                      </Link>
                    }
                    secondary={
                      <Typography variant="body2">{url.actualUrl}</Typography>
                    }
                  ></ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RecentLinks;
