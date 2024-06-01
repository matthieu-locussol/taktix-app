import { NPC, NPCInformations } from 'shared/src/data/npcs';
import { DialogItem } from '../store/DialogMenuStore';
import { Store } from '../store/Store';
import { TFunctionWrapper } from '../types/react-i18next';

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
