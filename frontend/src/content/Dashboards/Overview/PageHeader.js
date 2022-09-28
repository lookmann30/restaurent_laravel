import { Typography, Avatar, Grid, useTheme } from '@mui/material';
import { parseCookies } from 'nookies'
function PageHeader() {
  const theme = useTheme();
  const cookies = parseCookies();

  return (

    <Grid container alignItems="center">
   
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {cookies.user}!
        </Typography>
        <Typography variant="subtitle2">
          Overview Data for Resturant
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
