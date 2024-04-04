import {
  Container,
  Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import RecentLinks from "../components/RecentLinks";
import URLShortener from "../components/OldURLShortener";
import config from "../config/config";
import { LinksResponse } from "../types/link.types";

const Home = () => {
  const [recentUrls, setRecentUrls] = useState<LinksResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${config.BACKEND_BASE_URL}/recentLinks`)
      .then((res) => res.json())
      .then((data) => {
        setRecentUrls(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <URLShortener />
          <Divider sx={{ my: 2 }} />
          <RecentLinks recentUrls={recentUrls} />
        </Container>
      )}
    </>
  );
};

export default Home;
