import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageHeader from 'src/content/Kitchen_transactions/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentOrders from 'src/content/Kitchen_transactions/RecentOrders';


//nookies
import nookies from 'nookies'

function OrderTransactions() {
  return (
    <>
      <Head>
        <title>Kitchen Transactions</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

OrderTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default OrderTransactions;

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

