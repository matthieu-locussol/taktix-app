import { darken, svgIconClasses } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { forwardRef } from 'react';
import { Tooltip } from './Tooltip';

export interface ShortcutIconProps extends IconButtonProps {
   icon: React.ReactNode;
   active?: boolean;
   title?: string;
}

export const ShortcutIcon = forwardRef<HTMLButtonElement, ShortcutIconProps>(
   ({ icon, active, title, ...rest }, ref) => (
      <Tooltip title={title} placement="top">
         <IconButton
            ref={ref}
            centerRipple={false}
            sx={({ palette }) => ({
               borderRadius: '8px',
               border: `1px solid ${palette.paper.border}`,
               background: darken(`${palette.paper.background}C6`, 0.2),
               opacity: rest.disabled ? 0.5 : 1,
               color: palette.primary.light,
               '&:hover': {
                  background: darken(`${palette.paper.background}C6`, 0.8),
               },
               [`& .${svgIconClasses.root}`]: {
                  color: active ? palette.primary.light : palette.chalk.main,
                  fontSize: '1.75vw',
               },
            })}
            {...rest}
         >
            {icon}
         </IconButton>
      </Tooltip>
   ),
);
