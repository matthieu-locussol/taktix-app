import { NPC, NPCInformations } from 'shared/src/data/npcs';
import { DialogItem } from '../store/DialogMenuStore';
import { Store } from '../store/Store';
import { TFunctionWrapper } from '../types/react-i18next';

export const npcsDialogs: Record<
   NPC,
   (infos: NPCInformations, store: Store, t: TFunctionWrapper) => DialogItem[]
> = {
   Akara: ({ avatar, name }, _store, _t) => [
      {
         content: 'Sais-tu qui je suis...?',
         name: '???',
      },
      {
         content: 'Je suis AKARA du CAMP DES ROGUES !',
         name,
         avatar,
      },
      {
         content: 'Tu veux te fight avec moi ?',
         name,
         avatar,
         choices: [
            {
               text: 'Non',
               callback: () => {
                  // Nothing to do
               },
            },
         ],
      },
   ],
   Nono: ({ avatar, name }, store, _t) => [
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
         content: "Eh, toi ! Tu veux pas m'aider à retrouver mes bouteilles ?",
         name,
         avatar,
         choices: [
            {
               text: 'Oui',
               callback: () => {
                  store.nonoClickerMenuStore.open();
               },
            },
            {
               text: 'Non',
               callback: () => {
                  // Nothing to do
               },
            },
         ],
      },
   ],
};
