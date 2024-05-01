import { NPC, NPCInformations } from 'shared/src/data/npcs';
import { DialogItem } from '../store/DialogMenuStore';
import { Store } from '../store/Store';
import { TFunctionWrapper } from '../types/react-i18next';

export const npcsDialogs: Record<
   NPC,
   (infos: NPCInformations, store: Store, t: TFunctionWrapper) => DialogItem[]
> = {
   Akara: ({ avatar, name }, store, _t) => [
      {
         content: 'Sais-tu qui je suis, jeune cuck...?',
         name: '???',
      },
      {
         content: 'Je suis AKARA la PUTE !',
         name,
         avatar,
      },
      {
         content: 'Tu veux te fight avec moi ?',
         name,
         avatar,
         choices: [
            { text: 'Oui', callback: () => store.colyseusStore.fightPvE(1) },
            {
               text: 'Non',
               callback: () => {
                  // Nothing to do
               },
            },
         ],
      },
   ],
   'Serge Dualé': ({ avatar, name }, _store, _t) => [
      {
         content: 'Bordel il est passé où mon pinard ?',
         name,
         avatar,
      },
      {
         content: '...',
         name,
         avatar,
      },
      {
         content: "Eh, toi ! C'est toi qu'à volé mon pinard ?!",
         name,
         avatar,
      },
   ],
};
