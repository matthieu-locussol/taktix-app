import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { version } from '../../../package.json';
import { useStore } from '../../store';
import { Updater } from '../updater/Updater';

export const LoginScreen = observer(() => {
   const store = useStore();
   const { loginStore, characterStore } = store;

   return (
      <Box
         component="form"
         onSubmit={(e) => {
            e.preventDefault();
            characterStore.setName(loginStore.input);
            store.initialize(loginStore.input);
         }}
         sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
         }}
      >
         <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2, mr: 2 }}>
            <img
               src="/android-chrome-192x192.png"
               alt=""
               width={48}
               height={48}
               style={{ margin: 'auto', marginRight: 16 }}
            />
            <Typography color="white" variant="h3">
               Taktix
            </Typography>
            <Typography
               color="white"
               fontWeight="bold"
               variant="overline"
               sx={{ mt: 'auto', ml: 1 }}
            >
               v{version}
            </Typography>
         </Box>
         <Typography color="red">{loginStore.errorMessage}</Typography>
         <Updater />
      </Box>
   );
});
