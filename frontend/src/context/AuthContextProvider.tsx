/* This file is from the code-along dated 2026-02-02.
I checked if the code worked after integrating it to my previous code-along compilation. It works,
both if I enter the credentials of an invalid user (error msg is displayed),
and if I enter the credentials of the only user registered in the MySQL database (a welcome msg is displayed). 
*/

import { useEffect, useState } from "react";
import type { UserData } from "../types/userTypes";
import { AuthContext } from "./AuthContext";

// TS - interface til Provideren
interface AuthContextProviderInterface {
  children: React.ReactNode;
};

// Her oprettes AuthContextProvider
// Dette er den provider vi wrapper vores komponenter i, som skal have adgang til
// alle de værdier/states vi vil bruge på tværs af appen.
/* The said wrapping is done in main.tsx. The App component is a child of AuthContextProvider.
See notes in AuthContext.tsx about contexts and context providers. The following is an old way of creating a React context. */
export const AuthContextProvider = ({ children }: AuthContextProviderInterface) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // et useEffect hook der kører når komponentet mounter (første load).
  // Tjekker om vi har gemt userData i localStorage, parser den og gemmer den i userData staten
  /* This checks if a user is already logged in because the logout function removes user data from local storage. */
  useEffect(() => {
    function getLocalUserState() {
      if (localStorage.getItem('userData')) {
        /* See notes in AuthContext.tsx about TypeScript's non-null assertion operator. */
        const json = JSON.parse(localStorage.getItem('userData')!);
        setUserData(json);
      };
    };
    getLocalUserState();
  }, []);

  // Tjekker om userData er noget og gemmer dem i localStorage
  /* er noget = exists 
  The dependency array triggers this useEffect hook whenever the state userData changes.
  This useEffect hook needs to exist for cases where the user was not already logged in when accessing the page.
  It's an interesting (probably simple) strategy since this hook will also be triggered after the above
  useEffect hook is executed, i.e. the data already stored in local storage will be saved again to
  local storage because the above saves it in the state userData, and the hook below will be triggered by a change 
  of that state. 
  */
  useEffect(() => {
    if (userData !== null) localStorage.setItem('userData', JSON.stringify(userData))
  }, [userData]);

  /* This removes data from local storage so that the user isn't automatically logged in when accessing the page again. */
  const logout = () => {
    if (localStorage.getItem('userData')) localStorage.removeItem('userData')

    setUserData(null)
  };

  // Returner AuthContext med alle de values vi vil bruge rundt om i appen
  /* I was wondering why do all the hooks above had to be fed to AuthContext as props from AuthContextProvider,
  using the .Provider property of AuthContext, which is the name given by Kasper to a context created with 
  createContext (instead of just using the context). 
  This is the old way of doing things. In the version of React that we are using, we could use
  AuthContext to wrap the App component, without any provider, which was exactly my thought. More straightforward!  
  */
  return <AuthContext.Provider value={{ userData, setUserData, logout }}>{children}</AuthContext.Provider>
};
