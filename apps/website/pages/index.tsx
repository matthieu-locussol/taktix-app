import type { GetServerSideProps } from 'next';
import type { OsIconType } from '../components/OsIcon';
import type { Version } from './api/version';

import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';

import { ConditionalWrapper } from '../components/ConditionalWrapper';
import { CustomButton } from '../components/CustomButton';
import { StyledTab, StyledTabs } from '../components/CustomTabs';
import { DiscordIcon } from '../components/DiscordIcon';
import { OsIcons } from '../components/OsIcon';

const features = [
   'Launcher with auto-update',
   'Automated maintenance mode (when deploying new version on GitHub)',
   'Double login invalidation system',
   'Discord Rich Presence integration',
   'Multiple languages support using i18n (English, French & Japanese)',
   'Multiple maps made with Tiled',
   'Leveling system (from 1 to 200)',
   'Click-based and keyboard-based movement on a grid',
   'Chat with multiple channels and private messages',
   'Ranks and permissions',
   'Character creation, customization and deletion',
   'Statistics and leveling points',
   'Talent tree (PoE-like) with multiple starting points',
   'Teleporter system to move between maps (cost money)',
   'Inventory & equipments (different types of equipments like weapons, chestplates, helmets, etc.)',
   'Inventory sorting system',
   'Recycling system to get gachix, in-game currency to get items from a gatcha machine',
   'Loot system with multiple rarities and affixes (diablo-like)',
   'Wild battles (PvE) with random monster groups (normal, rare & epic monster rarities)',
   'Automated turn-based battles with adjustable speed',
   'Dodge, critical hit, thorns & life steal mechanics',
   'Interactive objects and player with context menu on click',
   'Dialog system with NPCs and objects',
   'Community menu to see online players',
   'Settings menu and preferences saving in local storage',
   'In-game minimap & grid overlay toggles',
];

const screens = [
   {
      src: '/screenshots/0.png',
      alt: 'Screenshot 1',
      width: 2488,
      height: 1598,
   },
   {
      src: '/screenshots/1.png',
      alt: 'Screenshot 2',
      width: 2038,
      height: 1576,
   },
   {
      src: '/screenshots/2.png',
      alt: 'Screenshot 3',
      width: 2042,
      height: 1578,
   },
   {
      src: '/screenshots/3.png',
      alt: 'Screenshot 4',
      width: 2042,
      height: 1578,
   },
   {
      src: '/screenshots/4.png',
      alt: 'Screenshot 5',
      width: 2444,
      height: 1558,
   },
   {
      src: '/screenshots/5.png',
      alt: 'Screenshot 6',
      width: 2438,
      height: 1554,
   },
   {
      src: '/screenshots/6.png',
      alt: 'Screenshot 7',
      width: 2084,
      height: 1606,
   },
   {
      src: '/screenshots/7.png',
      alt: 'Screenshot 8',
      width: 2080,
      height: 1598,
   },
   {
      src: '/screenshots/8.png',
      alt: 'Screenshot 9',
      width: 2082,
      height: 1610,
   },
   {
      src: '/screenshots/9.png',
      alt: 'Screenshot 10',
      width: 2078,
      height: 1604,
   },
];

const SCREENSHOT_WIDTH = 640;

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
                  <Typography color="white" fontWeight="bold" sx={{ mb: 2 }} variant="h3">
                     Taktix
                  </Typography>
                  <Typography color="white" sx={{ mb: 2, ml: 2, mt: 'auto' }} variant="overline">
                     {version}
                  </Typography>
               </Box>
               <Typography color="white" sx={{ opacity: 0.7 }} variant="h6">
                  The crapiest MMORPG ever.
               </Typography>
               <Typography
                  color="white"
                  fontStyle="italic"
                  sx={{ opacity: 0.7, mb: 4 }}
                  variant="subtitle1"
               >
                  Last release: {new Date(date).toUTCString()}
               </Typography>
               <Box
                  display="grid"
                  gap={4}
                  gridTemplateColumns={{ md: '1fr 1fr 1fr', sm: '1fr' }}
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
                              color="secondary"
                              disabled={updating}
                              size="large"
                              startIcon={OsIcons[name]}
                              variant="contained"
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
                  gap={2}
                  gridTemplateColumns="1fr 1fr"
                  justifyItems="center"
                  sx={{ position: 'fixed', bottom: 16, right: 16 }}
               >
                  <Link
                     href="https://github.com/matthieu-locussol/taktix-app"
                     rel="noopener noreferrer"
                     target="_blank"
                  >
                     <CustomButton
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
                        variant="contained"
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
                        variant="contained"
                     >
                        <DiscordIcon />
                     </CustomButton>
                  </Link>
               </Box>
            </Container>
         </Box>
         <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
               <StyledTabs aria-label="styled tabs example" value={value} onChange={handleChange}>
                  <StyledTab label="About" value={1} />
                  <StyledTab label="Screenshots" value={2} />
                  <StyledTab label="Credits" value={3} />
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
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        Taktix is an attempt to create a web-based MMORPG using TypeScript and
                        Phaser 3. The game is open source under the{' '}
                        <Link
                           href="https://github.com/matthieu-locussol/taktix-app?tab=GPL-3.0-1-ov-file"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           <b>GPL-3.0 licence</b>
                        </Link>{' '}
                        and still in development.
                     </Typography>
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        I developed this project to learn more about game development and to have
                        fun. The game is not meant to be taken seriously and probably contains some
                        bugs and glitches. The non exhaustive list of technologies used in this game
                        is:{' '}
                        <Link
                           href="https://www.typescriptlang.org/"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           TypeScript
                        </Link>
                        ,{' '}
                        <Link href="https://phaser.io/" rel="noopener noreferrer" target="_blank">
                           Phaser 3
                        </Link>
                        ,{' '}
                        <Link
                           href="https://annoraaq.github.io/grid-engine/"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           Grid-Engine
                        </Link>
                        ,{' '}
                        <Link href="https://react.dev/" rel="noopener noreferrer" target="_blank">
                           React
                        </Link>
                        ,{' '}
                        <Link href="https://colyseus.io/" rel="noopener noreferrer" target="_blank">
                           Colyseus
                        </Link>
                        ,{' '}
                        <Link href="https://mobx.js.org/" rel="noopener noreferrer" target="_blank">
                           MobX
                        </Link>
                        ,{' '}
                        <Link
                           href="https://www.i18next.com/"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           i18next
                        </Link>
                        ,{' '}
                        <Link href="https://zod.dev/" rel="noopener noreferrer" target="_blank">
                           Zod
                        </Link>
                        ,{' '}
                        <Link href="https://tauri.app/" rel="noopener noreferrer" target="_blank">
                           Tauri
                        </Link>
                        ,{' '}
                        <Link href="https://mui.com/" rel="noopener noreferrer" target="_blank">
                           Material UI
                        </Link>
                        ,{' '}
                        <Link
                           href="https://www.prisma.io/"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           Prisma
                        </Link>{' '}
                        and{' '}
                        <Link
                           href="https://www.mapeditor.org/"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           Tiled
                        </Link>
                        .
                     </Typography>
                     <Typography sx={{ width: '100%' }} textAlign="justify">
                        Here is a non-exhaustive list of features that are implemented:
                     </Typography>
                     <ul style={{ width: '100%' }}>
                        {features.map((feature) => (
                           <li key={feature} style={{ marginBottom: 8 }}>
                              {feature}
                           </li>
                        ))}
                     </ul>
                  </>
               )}
               {value === 2 && (
                  <Box display="grid" gap={4} gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}>
                     {screens.map(({ src, alt, width, height }) => (
                        <Image
                           key={src}
                           alt={alt}
                           height={SCREENSHOT_WIDTH * (height / width)}
                           src={src}
                           style={{
                              border: '2px solid #111827',
                              borderRadius: 8,
                           }}
                           width={SCREENSHOT_WIDTH}
                        />
                     ))}
                  </Box>
               )}
               {value === 3 && (
                  <>
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        Tilesets:{' '}
                        <Link
                           href="https://twitter.com/ElvGames"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           ElvGames
                        </Link>
                     </Typography>
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        Animations Spritesheets:{' '}
                        <Link
                           href="https://bdragon1727.itch.io/"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           BDragon1727
                        </Link>
                     </Typography>
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        Characters Spritesheets:{' '}
                        <Link
                           href="https://twitter.com/ElvGames"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           ElvGames
                        </Link>
                     </Typography>
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        Fight music:{' '}
                        <Link
                           href="https://opengameart.org/users/flixberry-entertainment"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           Flixberry Entertainment
                        </Link>
                     </Typography>
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        Musics:{' '}
                        <Link
                           href="https://sonatina.itch.io/"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           Sara Garrard
                        </Link>
                     </Typography>
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        Font:{' '}
                        <Link
                           href="https://fonts.google.com/?query=Matt+McInerney"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           Matt McInerney
                        </Link>
                     </Typography>
                     <Typography sx={{ mb: 2, width: '100%' }} textAlign="justify">
                        Icons:{' '}
                        <Link
                           href="https://game-icons.net/"
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           Game-icons
                        </Link>
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
