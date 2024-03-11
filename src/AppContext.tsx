import {createContext} from 'react';
type AppContextType = {
  isUpdated: boolean;
  setIsUpdated: (isUpdated: boolean) => void;
};
export const AppContext = createContext<AppContextType>({
  isUpdated: false,
  setIsUpdated: () => {},
});
export default AppContext;
