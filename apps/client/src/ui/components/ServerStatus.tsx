import { BoxProps, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { StatusSchema, zStatusSchema } from 'shared/src/schemas/StatusSchema';
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

            const json = await results.json();
            const { status } = zStatusSchema.parse(json);

            newsStore.setStatus(status);
         } catch (e) {
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
            <b>Server status:</b> {newsStore.status}
         </Typography>
         <BadgeIcon status={newsStore.status} />
      </StyledBox>
   );
});

const StyledBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
});

interface StyleProps {
   status: StatusSchema['status'];
}

const BadgeIcon = styled('div')<StyleProps>(({ theme, status }) => ({
   width: theme.spacing(1.5),
   height: theme.spacing(1.5),
   borderRadius: 999,
   backgroundColor: {
      online: '#22c55e',
      maintenance: '#f59e0b',
      offline: '#ef4444',
   }[status],
}));
