import { createContext, useContext } from 'react';

import { Store } from './Store';

export const store = new Store();

export const StoreContext = createContext<{ store: Store }>({ store });

export const useStore = () => {
   const storeObject = useContext(StoreContext);

   if (!storeObject.store) {
      throw new Error('useStore must be used within a StoreProvider.');
   }

   return storeObject.store;
};
