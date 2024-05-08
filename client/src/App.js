import React from "react";
import { ContactProvider } from "./Context/ContactContext";
import ContactsManager from "./Page/ContactsManager";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <ContactProvider>
      <SnackbarProvider>
        <ContactsManager />
      </SnackbarProvider>
    </ContactProvider>
  );
};

export default App;
