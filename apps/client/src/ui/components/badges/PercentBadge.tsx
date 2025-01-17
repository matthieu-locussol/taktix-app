import { useTheme } from '@mui/material';

export const PercentBadge = () => {
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
               d="M166 136.8q-4.8 0-7.5 4.2-2.6 4.1-2.6 11.9 0 7.8 2.6 12 2.6 4.1 7.5 4.1t7.5-4.1q2.6-4.2 2.6-12t-2.7-11.9q-2.6-4.2-7.4-4.2zm0-11.4q12.6 0 19.9 7.3 7.3 7.4 7.3 20.2 0 12.8-7.3 20.3-7.3 7.4-19.9 7.4-12.6 0-19.9-7.4-7.3-7.5-7.3-20.3t7.3-20.1q7.3-7.4 19.9-7.4zm-62.2 55.2H88.75L152.1 75.42h15.1zM89.84 75.42q12.66 0 19.86 7.4 7.2 7.34 7.2 20.18 0 12.8-7.2 20.2-7.2 7.4-19.86 7.4-12.63 0-19.93-7.4-7.12-7.4-7.12-20.2 0-12.84 7.12-20.18 7.3-7.4 19.93-7.4zm0 11.41q-4.89 0-7.5 4.21-2.69 4.2-2.69 11.96 0 7.8 2.69 12.1 2.61 4.2 7.5 4.2 4.88 0 7.46-4.2 2.65-4.3 2.65-12.1 0-7.76-2.65-11.96-2.64-4.21-7.46-4.21z"
               fill={theme.palette.badges.color}
               fillOpacity="1"
            />
         </g>
      </g>
   );
};
