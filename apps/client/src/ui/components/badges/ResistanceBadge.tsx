import { useTheme } from '@mui/material';

export const ResistanceBadge = () => {
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
               d="M64 94l64-38 64 38c0 32-48 108-64 108-16 .25-64-76-64-108z"
               fill={theme.palette.badges.color}
               fillOpacity="1"
            />
         </g>
      </g>
   );
};
