import { DamagesBadge } from './DamagesBadge';
import { MoreBadge } from './MoreBadge';
import { PercentBadge } from './PercentBadge';
import { PlusBadge } from './PlusBadge';
import { ResistanceBadge } from './ResistanceBadge';

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
