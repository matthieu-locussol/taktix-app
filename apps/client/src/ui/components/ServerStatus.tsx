import { BoxProps, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../store';

const REFRESH_INTERVAL = 30_000;

export const ServerStatus = observer((props: BoxProps) => {
   const store = useStore();
   const { loginStore } = store;

   useEffect(() => {
      const fetchStatus = async () => {
         try {
            const results = await fetch(`${import.meta.env.VITE_SERVER_URL}/status`, {
               method: 'GET',
            });
            const json: { status: string } = await results.json();
            loginStore.setServerOnline(json.status === 'ok');
         } catch (e) {
            loginStore.setServerOnline(false);
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
            <b>Server status:</b> {loginStore.serverOnline ? 'online' : 'offline'}
         </Typography>
         <BadgeIcon online={loginStore.serverOnline} />
      </StyledBox>
   );
});

const StyledBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
});

const BadgeIcon = styled('div')<{ online: boolean }>(({ theme, online }) => ({
   width: theme.spacing(1.5),
   height: theme.spacing(1.5),
   borderRadius: 999,
   backgroundColor: online ? 'green' : 'red',
}));
