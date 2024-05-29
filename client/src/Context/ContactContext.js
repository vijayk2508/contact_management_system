import { createContext, useReducer, useEffect, useRef } from "react";
import { contactReducer, initialState } from "./reducer/contactReducer";
import { getAllContacts } from "../Services/contactServices";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const onMountRef = useRef(0);

  useEffect(() => {
    if (onMountRef.current === 0) {
      onMountRef.current = 1;
      getAllContacts({ dispatch });
    }
  }, []);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactProvider, ContactContext };
