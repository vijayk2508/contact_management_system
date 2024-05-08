import React, { useMemo } from "react";
import { ContactContext } from "../../../Context/ContactContext";
import { modalTypes } from "../../../Constant/general";
import DeleteContactCofirmation from "./DeleteContactCofirmation";
import CreateEditContact from "./CreateEditContact";
import { Dialog, DialogTitle } from "@mui/material";
import { handleModalClose } from "../../../Utils/helper";

function CommonModal() {
  const { state, dispatch } = React.useContext(ContactContext);
  const modal = state?.modal || null;

  return useMemo(() => {
    if (
      modal?.show &&
      modal?.type &&
      Object.values(modalTypes).includes(modal?.type)
    ) {
      const modalContent = {
        [modalTypes.CREATECONTACT]: <CreateEditContact />,
        [modalTypes.EDITCONTACT]: <CreateEditContact />,
        [modalTypes.DELETECONTACT]: <DeleteContactCofirmation />,
      }[modal?.type];

      return (
        <Dialog
          open={modal?.show || false}
          onClose={()=> handleModalClose(dispatch)}
        >
          <DialogTitle>{modal?.title || ""}</DialogTitle>
          {modalContent}
        </Dialog>
      );
    }

    return <></>;
  }, [dispatch, modal]);
}

export default CommonModal;
