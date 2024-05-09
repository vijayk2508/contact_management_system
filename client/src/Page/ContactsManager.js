import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ContactList from "../Component/ContactsManager/ContactList";
import SearchButton from "../Component/ContactsManager/SearchButton";
import UserProfile from "../Component/UserProfile";
import { ContactContext } from "../Context/ContactContext";
import { contactActionConstants } from "../Context/reducer/contactConstant";
import { modalTypes, wHeight } from "../Constant/general";
import CommonModal from "../Component/ContactsManager/Modals";
import { closeSnackbar, useSnackbar } from "notistack";
import Loader from "../Component/Loader";

const ContactsManager = () => {
  const alertRefs = useRef([]);
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = React.useContext(ContactContext);
  const { alerts, contactList, isNetworkError } = state;

  const closeAlert = useCallback(
    (index) => {
      dispatch({
        type: contactActionConstants.REMOVE_ALERT,
        alert_idx: index,
      });
    },
    [dispatch]
  );

  function dismissAlertNotification() {
    alertRefs.current.length &&
      alertRefs.current.forEach((alertRef) => {
        closeSnackbar(alertRef);
      });

    alertRefs.current.length = 0;
  }

  useEffect(() => {
    dismissAlertNotification();

    alerts.length &&
      alerts?.forEach((alert, index) => {
        const snackerId = enqueueSnackbar(alert.message, {
          variant: alert.type,
          autoHideDuration: 1000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
          preventDuplicate: true,
          onclose: () => closeAlert(index),
          onExit: () => closeAlert(index),
        });

        alertRefs.current = [...alertRefs.current, snackerId];
      });

    return () => {
      dismissAlertNotification();
    };
  }, [alerts, closeAlert, dispatch, enqueueSnackbar]);

  const addCreateContact = useCallback(() => {
    dispatch({
      type: contactActionConstants.OPEN_MODAL,
      modal: {
        show: true,
        title: "Create Contact",
        type: modalTypes.CREATECONTACT,
      },
    });
  }, [dispatch]);

  const content = useMemo(() => {
    if (contactList?.length > 0 || state?.onSearch === true) {
      return (
        <>
          <Grid
            container
            spacing={1}
            sx={{
              maxHeight: wHeight,
              minHeight: wHeight,
            }}
          >
            <Grid item xs={4}>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  minInlineSize: "100% !important",
                }}
              >
                <SearchButton />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => addCreateContact()}
                  sx={{ marginLeft: "10px" }}
                >
                  Add Contact
                </Button>
              </Box>
              <ContactList />
            </Grid>

            <Grid item xs={8}>
              <UserProfile />
            </Grid>
          </Grid>
        </>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => addCreateContact()}
          sx={{ marginLeft: "10px" }}
        >
          Add New Contact
        </Button>
      );
    }
  }, [addCreateContact, contactList?.length, state?.onSearch]);

  return useMemo(() => {
    const containerStyle =
      contactList?.length < 1
        ? {
            maxHeight: wHeight,
            minHeight: wHeight,
            alignContent: "center !important",
            textAlign: "center !important",
          }
        : {};

    if (state?.loadGetAllContacts) {
      return <Loader />;
    }

    return (
      <div>
        {isNetworkError ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxHeight: wHeight,
              minHeight: wHeight,
              justifyContent: "center",
              margin: "0px 60px",
            }}
          >
            <Typography variant="h5" gutterBottom textTransform={"capitalize"}>
              OOPs, There is some problem occured. Please try after sometime.
            </Typography>
          </Box>
        ) : (
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Contact List
                </Typography>
              </Toolbar>
            </AppBar>
            <Container
              sx={{ paddingTop: "20px", ...containerStyle }}
              maxWidth="900"
            >
              {content}
            </Container>
            <CommonModal />
          </>
        )}
      </div>
    );
  }, [contactList?.length, content, isNetworkError, state?.loadGetAllContacts]);
};

export default ContactsManager;
