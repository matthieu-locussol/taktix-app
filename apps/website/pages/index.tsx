import { Box, Button, Container, Link, Typography } from '@mui/material';

const IndexPage = () => (
   <Box>
      <Box
         sx={{
            backgroundImage: 'linear-gradient(120deg, #155799CC, #159957CC)',
            height: 360,
            borderBottom: '1px solid lightgray',
         }}
      >
         <Container
            maxWidth="md"
            sx={{
               display: 'flex',
               flexDirection: 'column',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Typography variant="h3" fontWeight="bold" color="white" sx={{ mb: 2 }}>
               Taktix
            </Typography>
            <Typography variant="h6" color="white" sx={{ opacity: 0.7, mb: 4 }}>
               A small browser game written in TypeScript.
            </Typography>
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={4}>
               <Link
                  href="https://github.com/matthieu-locussol/taktix-app/releases/download/v1.0.2/taktix_1.0.2_x64_en-US.msi"
                  sx={{ textDecoration: 'none' }}
               >
                  <Button variant="contained" size="large" color="secondary">
                     Download for Windows
                  </Button>
               </Link>
               <Link
                  href="https://github.com/matthieu-locussol/taktix-app/releases/download/v1.0.2/taktix_1.0.2_amd64.deb"
                  sx={{ textDecoration: 'none' }}
               >
                  <Button variant="contained" size="large" color="secondary">
                     Download for Linux
                  </Button>
               </Link>
               <Link
                  href="https://github.com/matthieu-locussol/taktix-app/releases/download/v1.0.2/taktix_1.0.2_x64.dmg"
                  sx={{ textDecoration: 'none' }}
               >
                  <Button variant="contained" size="large" color="secondary">
                     Download for Mac OS
                  </Button>
               </Link>
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
