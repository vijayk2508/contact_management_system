import React from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ContactContext } from "../../../Context/ContactContext";
import { errorAlert, handleModalClose } from "../../../Utils/helper";
import { deleteContact } from "../../../Services/contactServices";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const DeleteContactCofirmation = () => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(ContactContext);
  const modal = state?.modal || null;

  const handleSubmit = async () => {
    try {
      if (!modal?.data?._id) {
        errorAlert(dispatch, "Please contact administrator.");
        return;
      }

      let res = await deleteContact(modal?.data?._id, dispatch);

      if (res) {
        handleModalClose(dispatch);
      }
    } catch (error) {
      errorAlert(dispatch, error);
    }
  };

  return (
    <>
      <DialogContent className={classes.content}>
        <Typography>
          Are you sure you want to delete {modal && modal?.data?.name}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleModalClose(dispatch)}
          color="primary"
          className={classes.button}
        >
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={handleSubmit}>
          Delete
        </Button>
      </DialogActions>
    </>
  );
};

export default DeleteContactCofirmation;
