import { DamagesBadge } from './DamagesBadge.tsx';
import { MoreBadge } from './MoreBadge.tsx';
import { PercentBadge } from './PercentBadge.tsx';
import { PlusBadge } from './PlusBadge.tsx';
import { ResistanceBadge } from './ResistanceBadge.tsx';

export type Badge = 'plus' | 'percent' | 'more' | 'damages' | 'resistances';

interface BadgesProps {
   id?: Badge;
}

export const Badges = ({ id }: BadgesProps) => {
   if (id === undefined) {
      return null;
   }

   return {
      plus: <PlusBadge />,
      percent: <PercentBadge />,
      more: <MoreBadge />,
      damages: <DamagesBadge />,
      resistances: <ResistanceBadge />,
   }[id];
};
