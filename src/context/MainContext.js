import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../components/utility/Firebase";

export const UserContext = createContext({
  currentUserLoggedIn: null,
  setCurrentUserLoggedIn: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);
  const value = { currentUserLoggedIn, setCurrentUserLoggedIn };
  useEffect(() => {
    onAuthStateChangedListener((user) => {
      setCurrentUserLoggedIn(user);
    });
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// export const SessionContext = createContext({
//   sessionValue: null,
//   setSessionValue: () => null,
// });

// export const SessionProvider = ({ children }) => {
//   const [sessionValue, setSessionValue] = useState(null);
//   const value = { sessionValue, setSessionValue };
//   // console.log("session : " + sessionValue);
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

export const FetchContext = createContext({
  FetchValue: null,
  setFetchValue: () => null,
});

export const FetchProvider = ({ children }) => {
  const [FetchValue, setFetchValue] = useState(null);
  const value = { FetchValue, setFetchValue };
  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};

export const NotesContext = createContext({
  NotesValueFromContext: null,
  setNotesValueFromContext: () => null,
});

export const NotesProvider = ({ children }) => {
  const [NotesValueFromContext, setNotesValueFromContext] = useState(null);
  const value = { NotesValueFromContext, setNotesValueFromContext };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
export const CourseContext = createContext({
  CourseValueFromContext: null,
  setCourseValueFromContext: () => null,
});

export const CourseProvider = ({ children }) => {
  const [CourseValueFromContext, setCourseValueFromContext] = useState(null);
  console.log(CourseValueFromContext);
  const value = { CourseValueFromContext, setCourseValueFromContext };
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};
export const CurrentCourseContext = createContext({
  CurrentCourseValueFromContext: null,
  setCurrentCourseValueFromContext: () => null,
});

export const CurrentCourseProvider = ({ children }) => {
  const [CurrentCourseValueFromContext, setCurrentCourseValueFromContext] =
    useState(null);
  const value = {
    CurrentCourseValueFromContext,
    setCurrentCourseValueFromContext,
  };
  return (
    <CurrentCourseContext.Provider value={value}>
      {children}
    </CurrentCourseContext.Provider>
  );
};
