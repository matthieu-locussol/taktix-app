import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { TimeMgt } from 'shared/src/utils/timeMgt';

import { useStore } from '../../../store';

const NEWS_HEIGHT = 240;

export const Changelog = observer(() => {
   const { newsStore } = useStore();

   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: newsStore.loading ? 'center' : 'flex-start',
            overflowY: newsStore.loading ? 'hidden' : 'auto',
            maxHeight: NEWS_HEIGHT,
         }}
      >
         {newsStore.loading ? (
            <CircularProgress />
         ) : (
            <>
               {newsStore.changelogs.map(({ id, date, text }) => (
                  <Typography
                     key={`news-${id}`}
                     color="textSecondary"
                     dangerouslySetInnerHTML={{
                        __html: `<b>${TimeMgt.formatDatetime(
                           new Date(date),
                        )}</b><br />${text}<br />`,
                     }}
                     mb={2}
                     variant="body1"
                  />
               ))}
            </>
         )}
      </Box>
   );
});
