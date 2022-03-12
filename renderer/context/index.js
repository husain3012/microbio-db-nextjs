import React from "react";

const AppContext = React.createContext();

export const ContextProvider = (props) => {
  return <AppContext.Provider value={props.value}>{props.children}</AppContext.Provider>;
};

export default AppContext;
