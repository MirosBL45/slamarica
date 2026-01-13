'use client';

import React, { createContext, useContext } from 'react';
import { rootStore } from './RootStore';

const StoreContext = createContext(rootStore);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export const useStores = () => useContext(StoreContext);
