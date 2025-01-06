import type { StatusSchema } from 'shared/src/schemas/StatusSchema';

import { styled } from '@mui/material';

interface StatusBadgeProps {
   status: StatusSchema['status'];
}

export const StatusBadge = ({ status }: StatusBadgeProps) => <BadgeIcon status={status} />;

const BadgeIcon = styled('div', {
   shouldForwardProp: (prop) => prop !== 'status',
})<StatusBadgeProps>(({ theme, status }) => ({
   width: theme.spacing(1.5),
   height: theme.spacing(1.5),
   borderRadius: 999,
   backgroundColor: {
      online: '#22c55e',
      maintenance: '#f59e0b',
      offline: '#ef4444',
   }[status],
}));
