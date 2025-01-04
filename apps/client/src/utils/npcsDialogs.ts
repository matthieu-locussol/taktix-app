import type { NPC, NPCInformations } from 'shared/src/data/npcs.ts';
import type { DialogItem } from '../store/DialogMenuStore.ts';
import type { Store } from '../store/Store.ts';
import type { TFunctionWrapper } from '../types/react-i18next.ts';

export const npcsDialogs: Record<
   NPC,
   (infos: NPCInformations, store: Store, t: TFunctionWrapper) => DialogItem[]
> = {
   Nono: ({ avatar, name }, _store, t) => [
      {
         content: t('nono_dialog'),
         name,
         avatar,
      },
      {
         content: '...',
         name,
         avatar,
      },
   ],
};
