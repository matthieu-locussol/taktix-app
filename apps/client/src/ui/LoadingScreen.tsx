import { Box, CircularProgress, Stack, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

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

export const LoadingScreen = observer(() => {
   const {
      loadingScreenStore: { progress, currentAssetPath },
   } = useStore();

   return (
      <Wrapper>
         <Box position="relative" mb={2}>
            <CircularProgress size={80} variant="determinate" value={progress} />
            <ProgressValueWrapper>
               <Typography fontWeight="bold" color="white">
                  {progress}%
               </Typography>
            </ProgressValueWrapper>
         </Box>
         <Typography fontStyle="italic">{currentAssetPath}</Typography>
      </Wrapper>
   );
});
