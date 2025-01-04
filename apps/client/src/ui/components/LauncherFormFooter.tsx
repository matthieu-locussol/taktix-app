import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { useTranslation } from '../../types/react-i18next';

import { LauncherLinks } from './LauncherLinks';

export const LauncherFormFooter = observer(() => {
   const { screenStore } = useStore();
   const { t } = useTranslation();

   return (
      <Box
         sx={{
            mt: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
         }}
      >
         <Link onClick={() => screenStore.switchBetweenLoginAndRegister()}>
            {t(screenStore.loginOrRegisterOppositeName)}
         </Link>
         <LauncherLinks />
      </Box>
   );
});
