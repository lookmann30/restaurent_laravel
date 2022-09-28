

function page() {

  return null
}

export default page;

export async function getServerSideProps(context) {

  const { res } = context;

  res.writeHead(302, { Location: "/login"});
  res.end();

  return { 
    props : {}
  }
}