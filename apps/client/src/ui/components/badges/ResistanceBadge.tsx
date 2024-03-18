import { useTheme } from '@mui/material';

export const ResistanceBadge = () => {
   const theme = useTheme();

   return (
      <g transform="translate(256,256)">
         <g>
            <circle
               cx="128"
               cy="128"
               r="128"
               fill={theme.palette.badges.background}
               fillOpacity="1"
            ></circle>
            <circle
               stroke={theme.palette.badges.color}
               strokeOpacity="1"
               fill={theme.palette.badges.background}
               fillOpacity="1"
               strokeWidth="18"
               cx="128"
               cy="128"
               r="101"
            ></circle>
            <path
               fill={theme.palette.badges.color}
               fillOpacity="1"
               d="M64 94l64-38 64 38c0 32-48 108-64 108-16 .25-64-76-64-108z"
            ></path>
         </g>
      </g>
   );
};
