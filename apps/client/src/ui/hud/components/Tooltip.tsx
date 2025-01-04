import type { TooltipProps } from '@mui/material';

import { darken } from '@mui/material';
import MuiTooltip from '@mui/material/Tooltip';

export const Tooltip = (props: TooltipProps) => (
   <MuiTooltip
      arrow
      componentsProps={{
         tooltip: {
            sx: (theme) => ({
               padding: 1,
               fontSize: '0.75rem',
               fontWeight: 500,
               color: 'white',
               border: `1px solid ${theme.palette.paper.border}`,
               background: darken(`${theme.palette.paper.background}C6`, 0.15),
            }),
         },
         arrow: {
            sx: (theme) => ({
               color: darken(`${theme.palette.paper.background}C6`, 0.15),
            }),
         },
      }}
      {...props}
   />
);
