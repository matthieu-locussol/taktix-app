import { BoxProps, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { StatusResults } from 'shared/src/routers/StatusResults';
import { useStore } from '../../store';

const REFRESH_INTERVAL = 5_000;

export const ServerStatus = observer((props: BoxProps) => {
   const store = useStore();
   const { newsStore } = store;

   useEffect(() => {
      const fetchStatus = async () => {
         try {
            const results = await fetch(`${import.meta.env.VITE_SERVER_URL}/status`, {
               method: 'GET',
            });
            const json: StatusResults = await results.json();
            newsStore.setServerOnline(json.status === 'ok');
            newsStore.setServerMaintenance(json.status === 'maintenance');
         } catch (e) {
            newsStore.setServerOnline(false);
            newsStore.setServerMaintenance(false);
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
            <b>Server status:</b> {newsStore.status}
         </Typography>
         <BadgeIcon online={newsStore.serverOnline} maintenance={newsStore.serverMaintenance} />
      </StyledBox>
   );
});

const StyledBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
});

const BadgeIcon = styled('div')<{ online: boolean; maintenance: boolean }>(
   ({ theme, online, maintenance }) => ({
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
      borderRadius: 999,
      // eslint-disable-next-line no-nested-ternary
      backgroundColor: maintenance ? 'orange' : online ? 'green' : 'red',
   }),
);
