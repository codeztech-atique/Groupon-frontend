import { createContext, useContext, useReducer } from 'react';

const WikiSearchContext = createContext();

const initialState = {
  searchResults: [],
};

const actionTypes = {
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

const WikiSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WikiSearchContext.Provider value={{ state, dispatch }}>
      {children}
    </WikiSearchContext.Provider>
  );
};

const useWikiSearch = () => {
  const context = useContext(WikiSearchContext);
  if (!context) {
    throw new Error('useWikiSearch must be used within a WikiSearchProvider');
  }
  return context;
};

export { WikiSearchProvider, useWikiSearch, actionTypes };
