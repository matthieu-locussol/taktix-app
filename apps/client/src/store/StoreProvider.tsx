import { observer } from 'mobx-react-lite';
import React from 'react';

import { StoreContext, store } from '.';

interface StoreProviderProps {
   children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = observer(({ children }) => (
   <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
));
