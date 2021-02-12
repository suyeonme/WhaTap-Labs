import React, { createContext, useMemo, useReducer } from 'react';
import { INITIAL_STATE, reducer } from 'reducer/reducer';
import { ActionType } from 'reducer/actionTypes';

type ContextType = {
  state: typeof INITIAL_STATE;
  dispatch: (action: ActionType) => void;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataContext = createContext<ContextType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

function DataProvider({ children }: DataProviderProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
