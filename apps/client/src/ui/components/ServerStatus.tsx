import type { BoxProps } from '@mui/material';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Trans } from 'react-i18next';
import { zStatusSchema } from 'shared/src/schemas/StatusSchema.ts';

import { useStore } from '../../store/index.tsx';
import { useTranslation } from '../../types/react-i18next.ts';

import { StatusBadge } from './StatusBadge.tsx';

const REFRESH_INTERVAL = 5_000;

export const ServerStatus = observer((props: BoxProps) => {
   const store = useStore();
   const { newsStore } = store;
   const { t } = useTranslation();

   useEffect(() => {
      const fetchStatus = async () => {
         try {
            const results = await fetch(`${import.meta.env.VITE_SERVER_URL}/status`, {
               method: 'GET',
            });

            const json = await results.json();
            const { status } = zStatusSchema.parse(json);

            newsStore.setStatus(status);
         } catch (error) {
            console.error(error);

            newsStore.setStatus('offline');
         }
      };

      fetchStatus();

      const intervalId = window.setInterval(async () => {
         await fetchStatus();
      }, REFRESH_INTERVAL);

      return () => {
         window.clearInterval(intervalId);
      };
   }, []);

   return (
      <StyledBox {...props}>
         <Typography sx={{ m: 0 }}>
            <Trans
               components={{ b: <b /> }}
               i18nKey="serverStatus"
               values={{ status: t(newsStore.status) }}
            />
         </Typography>
         <StatusBadge status={newsStore.status} />
      </StyledBox>
   );
});

const StyledBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
});
