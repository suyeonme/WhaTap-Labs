import React, { createContext, useMemo, useReducer } from 'react';
import { INITIAL_STATE, reducer } from 'reducer/reducer';

export const DataContext = createContext();

function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
