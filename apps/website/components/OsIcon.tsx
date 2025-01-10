import { AppleIcon } from './AppleIcon';
import { LinuxIcon } from './LinuxIcon';
import { WindowsIcon } from './WindowsIcon';

export const OsIcons = {
   Linux: <LinuxIcon sx={{ fontSize: 20, mr: 1 }} />,
   MacOS: <AppleIcon sx={{ fontSize: 20, mr: 1 }} />,
   Windows: <WindowsIcon sx={{ fontSize: 20, mr: 1 }} />,
};

export type OsIconType = keyof typeof OsIcons;
