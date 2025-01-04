import { useTheme } from '@mui/material';

export const PlusBadge = () => {
   const theme = useTheme();

   return (
      <g transform="translate(256,256)">
         <g>
            <circle
               cx="128"
               cy="128"
               fill={theme.palette.badges.background}
               fillOpacity="1"
               r="128"
            />
            <circle
               cx="128"
               cy="128"
               fill={theme.palette.badges.background}
               fillOpacity="1"
               r="101"
               stroke={theme.palette.badges.color}
               strokeOpacity="1"
               strokeWidth="18"
            />
            <path
               d="M119 64v55H64v18h55v55h18v-55h55v-18h-55V64h-18z"
               fill={theme.palette.badges.color}
               fillOpacity="1"
            />
         </g>
      </g>
   );
};
