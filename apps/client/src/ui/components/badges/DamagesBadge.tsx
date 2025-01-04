import { useTheme } from '@mui/material';

export const DamagesBadge = () => {
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
               d="M128 53.346l8.997 46.964 34.883-32.706-20.325 43.283L199 104.93 157.115 128 199 151.07l-47.445-5.957 20.325 43.283-34.883-32.706L128 202.654l-8.997-46.964-34.883 32.706 20.325-43.283L57 151.07 98.885 128 57 104.93l47.445 5.957L84.12 67.604l34.883 32.706z"
               fill={theme.palette.badges.color}
               fillOpacity="1"
            />
         </g>
      </g>
   );
};
