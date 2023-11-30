import React, { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from 'react';

type GlobalState = {
  data: any; // Replace 'any' with your data type for stricter type checking
};

type GlobalStateContextType = {
  state: GlobalState;
  setState: Dispatch<SetStateAction<GlobalState>>;
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

type GlobalStateProviderProps = {
  children: ReactNode;
};

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
  const [state, setState] = useState<GlobalState>({ data: null });

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export default GlobalStateContext;
