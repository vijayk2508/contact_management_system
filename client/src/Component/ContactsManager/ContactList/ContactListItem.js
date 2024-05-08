import React, { useMemo } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { contactActionConstants } from "../../../Context/reducer/contactConstant";
import { modalTypes } from "../../../Constant/general";

function ContactListItem({
  objContact,
  index,
  lastIndex,
  dispatch,
  userProfile,
}) {
  const isSelected = useMemo(() => {
    return objContact?._id === userProfile?._id;
  }, [objContact?._id, userProfile?._id]);

  const handleListItemClick = (e) => {
    e.preventDefault();
    dispatch({
      type: contactActionConstants.SET_USER_PROFILE,
      userProfile: objContact,
    });
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    dispatch({
      type: contactActionConstants.OPEN_MODAL,
      modal: {
        show: true,
        title: "Edit Contact",
        type: modalTypes.EDITCONTACT,
        data: objContact,
      },
    });
    handleListItemClick(e);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch({
      type: contactActionConstants.OPEN_MODAL,
      modal: {
        show: true,
        title: "Delete Contact",
        type: modalTypes.DELETECONTACT,
        data: objContact,
      },
    });
    handleListItemClick(e);
  };

  return (
    <React.Fragment>
      <ListItem
        alignItems="flex-start"
        key={objContact._id}
        onClick={handleListItemClick}
        style={{
          backgroundColor: isSelected ? "#1976d2" : "inherit",
          color: isSelected ? "white" : "inherit",
          cursor: "pointer",
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={objContact.name}
            src={objContact.imageURL || "/static/images/avatar/1.jpg"}
          />
        </ListItemAvatar>
        <ListItemText
          primary={objContact.name}
          secondary={objContact?.email?.toLowerCase() || ""}
          primaryTypographyProps={{
            style: {
              color: isSelected ? "white" : "inherit",
              textTransform: "capitalize",
            },
          }}
          secondaryTypographyProps={{
            style: {
              color: isSelected ? "white" : "inherit",
            },
          }}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="edit"
            onClick={handleEditClick}
            style={{ color: isSelected ? "white" : "inherit" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleDeleteClick}
            style={{ color: isSelected ? "white" : "inherit" }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {lastIndex - 1 !== index && <Divider variant="inset" component="li" />}
    </React.Fragment>
  );
}

export default ContactListItem;
