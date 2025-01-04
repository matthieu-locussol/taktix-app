import { observer } from 'mobx-react-lite';
import { createContext, useContext } from 'react';

import { Store } from './Store';

export const store = new Store();

const StoreContext = createContext<{ store: Store }>({ store });

interface StoreProviderProps {
   children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = observer(({ children }) => (
   <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
));

export const useStore = () => {
   const storeObject = useContext(StoreContext);

   if (!storeObject.store) {
      throw new Error('useStore must be used within a StoreProvider.');
   }

   return storeObject.store;
};
