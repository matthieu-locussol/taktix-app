import { useTheme } from '@mui/material';

export const MoreBadge = () => {
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
               d="M89.11 76.38L76.38 89.11 115.272 128l-38.89 38.89 12.728 12.73L128 140.728l38.89 38.89 12.73-12.728L140.728 128l38.89-38.89-12.728-12.73L128 115.272z"
               fill={theme.palette.badges.color}
               fillOpacity="1"
            />
         </g>
      </g>
   );
};
