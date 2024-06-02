import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { ConditionalWrapper } from '../components/ConditionalWrapper';
import { CustomButton } from '../components/CustomButton';
import { StyledTab, StyledTabs } from '../components/CustomTabs';
import { DiscordIcon } from '../components/DiscordIcon';
import { OsIconType, OsIcons } from '../components/OsIcon';
import { Version } from './api/version';

interface IndexPageProps {
   date: string;
   version: string;
   platforms: {
      name: OsIconType;
      url: string;
      availableText: string;
      updatingText: string;
      updating: boolean;
      extension: string;
   }[];
}

const IndexPage = ({ version, date, platforms }: IndexPageProps) => {
   const [value, setValue] = useState(1);

   const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   return (
      <Box>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               background: 'rgb(17,94,89)',
               backgroundImage:
                  'radial-gradient(circle, rgba(17,94,89,1) 0%, rgba(17,24,39,1) 100%)',
               borderBottom: '1px solid lightgray',
               p: 8,
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
                  The crapiest MMORPG ever.
               </Typography>
               <Typography
                  variant="subtitle1"
                  fontStyle="italic"
                  color="white"
                  sx={{ opacity: 0.7, mb: 4 }}
               >
                  Last release: {new Date(date).toUTCString()}
               </Typography>
               <Box
                  display="grid"
                  gridTemplateColumns={{ md: '1fr 1fr 1fr', sm: '1fr' }}
                  gap={4}
                  justifyItems="center"
               >
                  {platforms.map(
                     ({ name, url, updating, availableText, updatingText, extension }) => (
                        <ConditionalWrapper
                           key={extension}
                           condition={!updating}
                           wrapper={(children) => (
                              <Link href={url} sx={{ textDecoration: 'none' }}>
                                 {children}
                              </Link>
                           )}
                        >
                           <CustomButton
                              disabled={updating}
                              variant="contained"
                              size="large"
                              color="secondary"
                              startIcon={OsIcons[name]}
                           >
                              <Typography fontStyle={updating ? 'italic' : 'normal'}>
                                 {updating ? updatingText : `${availableText} (${extension})`}
                              </Typography>
                           </CustomButton>
                        </ConditionalWrapper>
                     ),
                  )}
               </Box>
               <Box
                  display="grid"
                  gridTemplateColumns={{ xs: '1fr 1fr', md: '1fr' }}
                  gridTemplateRows={{ xs: '1fr', md: '1fr 1fr' }}
                  gap={2}
                  justifyItems="center"
                  sx={{
                     position: 'fixed',
                     bottom: 16,
                     right: 16,
                  }}
               >
                  <Link
                     href="https://github.com/matthieu-locussol/taktix-app"
                     rel="noopener noreferrer"
                     target="_blank"
                  >
                     <CustomButton
                        variant="contained"
                        sx={{
                           p: 1,
                           minWidth: 0,
                           borderRadius: 9999,
                           borderColor: '#181717',
                           backgroundColor: '#181717',
                           '&:hover': {
                              backgroundColor: '#181717AA',
                           },
                        }}
                     >
                        <GitHubIcon />
                     </CustomButton>
                  </Link>
                  <Link
                     href="https://discord.gg/9a9EVKTMkX"
                     rel="noopener noreferrer"
                     target="_blank"
                  >
                     <CustomButton
                        variant="contained"
                        sx={{
                           p: 1,
                           minWidth: 0,
                           borderRadius: 9999,
                           borderColor: '#5865F2',
                           backgroundColor: '#5865F2',
                           '&:hover': {
                              backgroundColor: '#5865F2AA',
                           },
                        }}
                     >
                        <DiscordIcon />
                     </CustomButton>
                  </Link>
               </Box>
            </Container>
         </Box>
         <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
               <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                  <StyledTab value={1} label="Workflows" />
                  <StyledTab value={2} label="Datasets" />
                  <StyledTab value={3} label="Connections" />
               </StyledTabs>
            </Box>
            <Container
               maxWidth="lg"
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 4,
                  mb: 6,
               }}
            >
               {value === 1 && (
                  <>
                     <Typography textAlign="justify" sx={{ mb: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                     </Typography>
                     <Typography textAlign="justify" sx={{ mb: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                     </Typography>
                     <Typography textAlign="justify" sx={{ mb: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                     </Typography>
                  </>
               )}
            </Container>
         </Box>
      </Box>
   );
};

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
               url: version?.platforms?.['linux-x86_64']?.url.replace('.tar.gz', '') || '',
               availableText: 'Download for Linux',
               updatingText: 'Updating for Linux...',
               updating: typeof version?.platforms?.['linux-x86_64']?.url !== 'string',
               extension: '.AppImage',
            },
            {
               name: 'MacOS',
               url:
                  version?.platforms?.['windows-x86_64']?.url.replace('_en-US.msi.zip', '.dmg') ||
                  '',
               availableText: 'Download for Mac OS',
               updatingText: 'Updating for Mac OS...',
               updating: typeof version?.platforms?.['darwin-x86_64']?.url !== 'string',
               extension: '.app',
            },
            {
               name: 'Windows',
               url: version?.platforms?.['windows-x86_64']?.url.replace('.zip', '') || '',
               availableText: 'Download for Windows',
               updatingText: 'Updating for Windows...',
               updating: typeof version?.platforms?.['windows-x86_64']?.url !== 'string',
               extension: '.msi',
            },
         ],
      },
   };
};
