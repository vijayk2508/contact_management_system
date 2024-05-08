import API_CONSTANT from "../Constant/API_Constant";
import { contactActionConstants } from "../Context/reducer/contactConstant";
import { errorAlert, successAlert } from "../Utils/helper";
import ServiceAPI from "./ServiceAPI";

const createContact = async (objContact, dispatch) => {
  return await ServiceAPI.post(API_CONSTANT.ContactDetail.CREATE, objContact)
    .then((_response) => {
      getAllContacts({ dispatch });
      successAlert(dispatch, "Contact created successfully");
      return true;
    })
    .catch((error) => {
      console.log(error);
      errorAlert(dispatch, error);
      return false;
    });
};

const editContact = async (id, objContact, dispatch) => {
  return await ServiceAPI.put(
    `${API_CONSTANT.ContactDetail.UPDATE}/${id}`,
    objContact
  )
    .then((_response) => {
      getAllContacts({ dispatch });
      successAlert(dispatch, "Contact updated successfully");
      return true;
    })
    .catch((error) => {
      console.log(error);
      errorAlert(dispatch, error);
      return false;
    });
};

const deleteContact = async (contactId, dispatch) => {
  return await ServiceAPI.delete(
    `${API_CONSTANT.ContactDetail.DELETE}/${contactId}`
  )
    .then((_response) => {
      getAllContacts({ dispatch });
      successAlert(dispatch, "Contact Deleted successfully");
      return true;
    })
    .catch((error) => {
      console.log(error);
      errorAlert(dispatch, error);
      return false;
    });
};

const getAllContacts = async ({
  dispatch,
  dispatchActionType = contactActionConstants.GETALL,
  skip = 0,
  searchTerm = "",
  limit = 15,
}) => {
  let url = `${API_CONSTANT.ContactDetail.GET_ALL_CONTACT_DETAILS}?skip=${skip}&limit=${limit}`;

  if (searchTerm) {
    url = url + `&search=${searchTerm}`;
  }

  url = encodeURI(url);

  return await ServiceAPI.get(url)
    .then((response) => {
      dispatch({
        type: dispatchActionType,
        contacts: response.data,
        totalSize: response.total,
        listItemLoading: false,
        onSearch: false,
        searchTerm: searchTerm,
      });
      return true;
    })
    .catch((error) => {
      errorAlert(dispatch, error);
      return false;
    });
};

export { createContact, editContact, deleteContact, getAllContacts };
