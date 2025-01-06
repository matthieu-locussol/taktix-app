import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';

export const LoadingAssetsScreen = observer(() => {
   const {
      loadingScreenStore: { progress, currentAssetPath },
   } = useStore();

   return (
      <Wrapper>
         <Box mb={2} position="relative">
            <CircularProgress size={80} value={progress} variant="determinate" />
            <ProgressValueWrapper>
               <Typography color="white" fontWeight="bold">
                  {progress}%
               </Typography>
            </ProgressValueWrapper>
         </Box>
         <Typography fontStyle="italic">{currentAssetPath}</Typography>
      </Wrapper>
   );
});

const Wrapper = styled(Stack)(() => ({
   height: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   lineHeight: 0,
}));

const ProgressValueWrapper = styled(Box)(() => ({
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   display: 'flex',
   position: 'absolute',
   alignItems: 'center',
   justifyContent: 'center',
   lineHeight: 0,
}));
