import { Grid, Typography, Avatar } from "@mui/material";

const AboutMe = () => {
  return (
    <Grid container direction="row-reverse">
      <Grid item xs={12} md={3}>
        <Avatar
          src="../../public/profile.png"
          alt="Your Name"
          sx={{ width: 100, height: 100, margin: 'auto' }}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <Typography
          variant="body1"
          fontSize={35}
          gutterBottom
          fontWeight="bold"
        >
          About me
        </Typography>
        <Typography variant="body1" fontSize={20} gutterBottom>
          I am a software consultant experienced in diverse business domains, dedicated to crafting web/mobile applications using Java/Javascript based framworks. 
          I advocate for comprehensive testing strategies, including various test types, ensuring high-quality, maintainable code from the outset.
        </Typography>
        <Typography variant="body1" fontSize={20} gutterBottom>
          Currently I work as a Senior Software Engineer at Palo IT, a global innovation consultancy and agile software development company. 
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AboutMe;