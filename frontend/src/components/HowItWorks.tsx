import { Grid, Link, Typography } from "@mui/material";

const HowItWorks = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          fontSize={35}
          gutterBottom
          fontWeight="bold"
        >
          How this works?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" fontSize={20} gutterBottom>
          This is a simple URL shortener service. Just paste the URL you want to
          shorten and click on the shorten button. You will get a shortened URL
          that you can use to access the original URL.
        </Typography>
        <Typography variant="body1" fontSize={20} gutterBottom>
          Internally this service generates a unique slug for the long URL. It
          is generated using a base62 encoding of the DB identifier and is
          always 5 characters long. When a user accesses the shortened URL, the
          service looks up the slug in the database and redirects the user to
          the original URL.
        </Typography>

        <Typography variant="body1" fontSize={20} gutterBottom>
          {`More details about the implementation can be found in this `}
          <Link
            href="https://github.com/mtripathy-palo/url-shortener"
            target="_blank"
          >
            GitHub repository
          </Link>
          .
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HowItWorks;
