import GitHubIcon from '@mui/icons-material/GitHub';
import WebsiteIcon from '@mui/icons-material/LanguageRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { DiscordIcon } from './DiscordIcon.tsx';

const LINKS = [
   {
      href: 'https://taktix.vercel.app',
      icon: <WebsiteIcon />,
      color: '#14B8A6',
   },
   {
      href: 'https://discord.gg/9a9EVKTMkX',
      icon: <DiscordIcon />,
      color: '#5865F2',
   },
   {
      href: 'https://github.com/matthieu-locussol/taktix-app',
      icon: <GitHubIcon />,
      color: '#adbac7',
   },
] as const;

export const LauncherLinks = () => (
   <Box>
      {LINKS.map(({ href, icon, color }) => (
         <IconButton
            key={href}
            color="inherit"
            href={href}
            rel="noopener noreferrer"
            sx={{
               transition: 'color 0.2s',
               '&:hover': { color },
            }}
            target="_blank"
         >
            {icon}
         </IconButton>
      ))}
   </Box>
);
