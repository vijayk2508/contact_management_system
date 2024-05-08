import React, { useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { getAllContacts } from "../../../Services/contactServices";
import { ContactContext } from "../../../Context/ContactContext";
import { contactActionConstants } from "../../../Context/reducer/contactConstant";
import { debounce } from "lodash";

export default function SearchButton({ placeholder = "Search" }) {
  const { state, dispatch } = React.useContext(ContactContext);
  const searchTermRef = useRef("");
  const searchTerm = state.searchTerm;

  const handleChange = (event) => {
    event.preventDefault();
    if (state.listItemLoading) {
      dispatch({
        type: contactActionConstants.SET_LOADING,
        listItemLoading: false,
      });
    }

    dispatch({
      type: contactActionConstants.ON_SEARCH,
      onSearch: true,
      listItemLoading: true,
      searchTerm: event.target.value,
    });

    searchTermRef.current = event.target.value;
    debouncedFetchData();
  };

  const fetchData = async () => {
    const skip = 0;
    await getAllContacts({
      dispatch,
      dispatchActionType: contactActionConstants.ON_SEARCH,
      skip,
      searchTerm: searchTermRef.current,
    });
  };

  // Debounce fetchData function
  const debouncedFetchData = debounce(fetchData, 300);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        height: "33px",
        flex: "auto",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: "auto", width: "100%" }}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "search google maps".toLowerCase(),
          flex: "auto",
        }}
        value={searchTerm}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" disabled>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
