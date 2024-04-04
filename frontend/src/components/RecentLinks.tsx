import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { LinksResponse } from "../types/link.types";

const RecentLinks = ({ recentUrls = [] }: { recentUrls: LinksResponse[] }) => {
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
