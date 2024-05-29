import React from "react";
import { ContactProvider } from "./Context/ContactContext";
import ContactsManager from "./Page/ContactsManager";
import { SnackbarProvider } from "notistack";
import EdenFaceComponent from "./Page/EdenFaceComponent";

const App = () => {
  return (
    <ContactProvider>
      <SnackbarProvider>
        <ContactsManager />
        {/* <EdenFaceComponent /> */}
      </SnackbarProvider>
    </ContactProvider>
  );
};

export default App;
