import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';

import Menus from 'src/content/Orders/Edit/Menus';
import Summary from 'src/content/Orders/Edit/Summary'

import { useRouter } from 'next/router'

//nookies
import nookies from 'nookies'
function EditOrder() {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <Head>
        <title>Edit order</title>
      </Head>
      <Container maxWidth="lg" sx={{marginTop:5}}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item lg={8.5} xs={12}>
            <Menus orderId={id}/>
          </Grid>
          <Grid item lg={3.5} xs={12}>
            <Summary orderId={id}/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

EditOrder.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default EditOrder;

export async function getServerSideProps(context) {
  const { req, res } = context
  const cookies = nookies.get(context)
  const token = cookies.token
  if (!token) {
    res.writeHead(302, { Location: '/'});
    res.end();
  }
  return {
    props: {}
  }
}

