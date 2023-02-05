import { Box, Button, Container, Link, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { ConditionalWrapper } from '../components/ConditionalWrapper';
import { Version } from './api/version';

interface IndexPageProps {
   date: string;
   version: string;
   platforms: {
      name: string;
      url: string;
      availableText: string;
      updatingText: string;
      updating: boolean;
      extension: string;
   }[];
}

const IndexPage = ({ version, date, platforms }: IndexPageProps) => (
   <Box>
      <Box
         sx={{
            backgroundImage: 'linear-gradient(120deg, #155799CC, #159957CC)',
            height: 360,
            borderBottom: '1px solid lightgray',
         }}
      >
         <Container
            maxWidth="lg"
            sx={{
               display: 'flex',
               flexDirection: 'column',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Box display="flex">
               <Typography variant="h3" fontWeight="bold" color="white" sx={{ mb: 2 }}>
                  Taktix
               </Typography>
               <Typography variant="overline" color="white" sx={{ mb: 2, ml: 2, mt: 'auto' }}>
                  {version}
               </Typography>
            </Box>
            <Typography variant="h6" color="white" sx={{ opacity: 0.7 }}>
               A small browser game written in TypeScript.
            </Typography>
            <Typography
               variant="subtitle1"
               fontStyle="italic"
               color="white"
               sx={{ opacity: 0.7, mb: 4 }}
            >
               Last release: {new Date(date).toUTCString()}
            </Typography>
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={4} justifyItems="center">
               {platforms.map(({ url, updating, availableText, updatingText, extension }) => (
                  <ConditionalWrapper
                     condition={!updating}
                     wrapper={(children) => (
                        <Link href={url} sx={{ textDecoration: 'none' }}>
                           {children}
                        </Link>
                     )}
                  >
                     <Button disabled={updating} variant="contained" size="large" color="secondary">
                        <Typography fontStyle={updating ? 'italic' : 'normal'}>
                           {updating ? updatingText : `${availableText} (${extension})`}
                        </Typography>
                     </Button>
                  </ConditionalWrapper>
               ))}
            </Box>
         </Container>
      </Box>
      <Box>
         <Container
            maxWidth="md"
            sx={{
               display: 'flex',
               flexDirection: 'column',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center',
               mt: 4,
            }}
         >
            <Typography textAlign="justify" sx={{ mb: 2 }}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
               pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
               deserunt mollit anim id est laborum.
            </Typography>
            <Typography textAlign="justify" sx={{ mb: 2 }}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
               pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
               deserunt mollit anim id est laborum.
            </Typography>
            <Typography textAlign="justify" sx={{ mb: 2 }}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
               dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
               pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
               deserunt mollit anim id est laborum.
            </Typography>
         </Container>
      </Box>
   </Box>
);

export default IndexPage;

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
   const data = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/version`);
   const version: Version = await data.json();

   return {
      props: {
         date: version?.pub_date || '',
         version: version?.version || '',
         platforms: [
            {
               name: 'Linux',
               url: version?.platforms?.['linux-x86_64']?.url || '',
               availableText: 'Download for Linux',
               updatingText: 'Updating for Linux...',
               updating: typeof version?.platforms?.['linux-x86_64']?.url !== 'string',
               extension: '.AppImage',
            },
            {
               name: 'Mac OS',
               url: version?.platforms?.['darwin-x86_64']?.url || '',
               availableText: 'Download for Mac OS',
               updatingText: 'Updating for Mac OS...',
               updating: typeof version?.platforms?.['darwin-x86_64']?.url !== 'string',
               extension: '.app',
            },
            {
               name: 'Windows',
               url: version?.platforms?.['windows-x86_64']?.url || '',
               availableText: 'Download for Windows',
               updatingText: 'Updating for Windows...',
               updating: typeof version?.platforms?.['windows-x86_64']?.url !== 'string',
               extension: '.msi',
            },
         ],
      },
   };
};
