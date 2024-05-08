import React, { useCallback, useState } from "react";
import List from "@mui/material/List";
import { ContactContext } from "../../../Context/ContactContext";
import ContactListItem from "./ContactListItem";
import { wHeight } from "../../../Constant/general";
import { getAllContacts } from "../../../Services/contactServices";
import { throttle } from "lodash";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { contactActionConstants } from "../../../Context/reducer/contactConstant";
import { makeStyles } from "@material-ui/core";

export default function ContactList() {
  const { state, dispatch } = React.useContext(ContactContext);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  const scrollableContainer = useCallback(
    (theme) => {
      let scollbaleCSS = {
        backgroundColor: theme.palette.background.paper,
        marginTop: "10px",
        width: "100%",
        position: "relative",
        overflow: "auto",
        maxHeight: wHeight,
        "& ul": {
          padding: 0,
        },
        minHeight: wHeight,

        border: "1px solid #e0e0e0",
        borderRadius: 4,
        overflowY: "auto", // Ensure vertical scrolling
        "&::-webkit-scrollbar": {
          width: "8px", // Width of the scrollbar
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#484949", // Color of the thumb
          borderRadius: "4px", // Border radius of the thumb
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#9c9da3", // Color of the track
        },
      };

      if (!state?.contactList.length) {
        scollbaleCSS = {
          ...scollbaleCSS,
          alignContent: "center !important",
          textAlign: "center !important",
        };
      } else {
        scollbaleCSS = {
          ...scollbaleCSS,
          padding: 0,
        };
      }

      return scollbaleCSS;
    },
    [state?.contactList.length]
  );

  const useStyles = makeStyles((theme) => ({
    scrollableContainer: scrollableContainer(theme),
  }));

  const classes = useStyles();

  const theme = useTheme();

  const handleScroll = throttle(async (e) => {
    e.preventDefault();
    const container = e.target;
    const bottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 1.5;

    if (
      bottom &&
      !state.listItemLoading &&
      currentPage * limit < state.totalSize
    ) {
      try {
        dispatch({
          type: contactActionConstants.SET_LOADING,
          listItemLoading: true,
        });

        const nextPage = currentPage + 1;
        const skip = nextPage * limit; // Calculate the skip value for the next page

        await getAllContacts({
          dispatch,
          dispatchActionType: contactActionConstants.ON_SCROLL_CONTACTLIST,
          page: nextPage,
          skip: skip, // Pass the calculated skip value to the backend
          limit: limit, // Pass the limit value as well
          searchTerm: state.searchTerm,
        });

        // Update current page and skip value
        setCurrentPage(nextPage);

        dispatch({
          type: contactActionConstants.SET_LOADING,
          listItemLoading: false,
        });
      } catch (error) {
        console.error("Error loading more contacts:", error);
        dispatch({
          type: contactActionConstants.SET_LOADING,
          listItemLoading: false,
        });
      }
    }
  }, 200);

  return (
    <List
      dense
      onScrollCapture={handleScroll}
      className={classes.scrollableContainer}
    >
      {state?.contactList?.map((objContact, index) => {
        const labelId = `checkbox-list-secondary-label-${objContact._id}`;
        return (
          <ContactListItem
            key={objContact._id + index}
            objContact={objContact}
            index={index}
            labelId={labelId}
            lastIndex={state?.contactList.length}
            dispatch={dispatch}
            userProfile={state.userProfile}
          />
        );
      })}
      {state.listItemLoading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 1,
            borderRadius: 8,
            backgroundColor: theme.palette.background.paper,
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!state?.contactList.length && !state.listItemLoading && (
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            maxHeight: wHeight,
            height: "calc(100vh - 630px) !important",
          }}
        >
          Oops, No users found.
        </Typography>
      )}
    </List>
  );
}
