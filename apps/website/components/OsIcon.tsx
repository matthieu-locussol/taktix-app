import { AppleIcon } from './AppleIcon.tsx';
import { LinuxIcon } from './LinuxIcon.tsx';
import { WindowsIcon } from './WindowsIcon.tsx';

export const OsIcons = {
   Linux: <LinuxIcon sx={{ fontSize: 20 }} />,
   MacOS: <AppleIcon sx={{ fontSize: 20 }} />,
   Windows: <WindowsIcon sx={{ fontSize: 20 }} />,
};

export type OsIconType = keyof typeof OsIcons;
