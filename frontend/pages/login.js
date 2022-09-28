import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled,
  Stack
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';
import MHidden from 'src/components/MHidden';

import Head from 'next/head';

import LoginFrom from 'src/content/Authen/loginform'

//nookies
import nookies from 'nookies'


const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    display: flex;
    align-items: center;
    flex: 1;
    overflow-x: hidden;
    width: 100%;
`
);

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(12, 0)
}));

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>Restaurant Management System</title>
      </Head>
      <Stack direction="row"  sx={{ width: "100%"}}>
          <MHidden width="mdDown">
            <SectionStyle>
              <Stack sx={{ width: "100%" }} spacing={1}>
                <Typography sx={{ ml: 3, fontSize: 20, fontWeight: 700 }}>
                  Welcome
                </Typography>
                <img src={`/static/images/welcome.png`} alt='welcome' width='100%' height='100%' />
              </Stack>
            </SectionStyle>
          </MHidden>
          
        <ContentStyle>
        <Typography align="left" sx={{ mb: 3, fontSize: 20, fontWeight: 700 }}>
                  Restaurant Management System
                </Typography>
          <Stack direction="row"  alignItems="center" sx={{ mb: 5 }}>
                <LoginFrom />
            </Stack>

        </ContentStyle>
      </Stack>

    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};


export async function getServerSideProps(context) {
  const { req, res } = context
  const cookies = nookies.get(context)
  const token = cookies.token
  if (token) {
    res.writeHead(302, { Location: '/dashboards'});
    res.end();
  }
  return {
    props: {}
  }
}