import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { WikiCard } from 'src/sections/wiki/wiki-card';
import { WikiSearch } from 'src/sections/wiki/wiki-search';
import { useWikiSearch } from 'src/contexts/wiki-search-context';



const Page = () => {
  const { state: { searchResults } } = useWikiSearch();
  return (
    <>
      <Head>
        <title>
          Wiki Search
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Wiki search
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  High-performance Wikipedia search and analysis
                </Stack>
              </Stack>
              
            </Stack>
            <WikiSearch />
            <Grid
              container
              spacing={3}
            >
              {searchResults.map((data) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={data.id}
                >
                  <WikiCard data={data} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Page;
