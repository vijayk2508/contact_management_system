import { contactActionConstants } from "./contactConstant";

const {
  CREATE,
  EDIT,
  DELETE,
  GETALL,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ALERT,
  REMOVE_ALERT,
  ON_SCROLL_CONTACTLIST,
  ON_SEARCH,
  SET_LOADING,
  SET_USER_PROFILE,
} = contactActionConstants;

const modal = {
  show: false,
  title: "",
  data: null,
  type: "",
};

const initialState = {
  userProfile: null,
  contactList: [],
  contactDataByQuery: null,

  error: null,
  alerts: [],
  loadGetAllContacts: true,
  listItemLoading: false,
  totalSize: 0,
  onSearch: false,
  searchTerm: "",
  isNetworkError: false,
  ...modal,
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case GETALL:
      return {
        ...state,
        contactList: action.contacts,
        userProfile: action.contacts?.[0] ?? null,
        totalSize: action.totalSize,
        loadGetAllContacts: false,
      };
    case CREATE: {
      return {
        ...state,
        contactList: [...state.contactList, action.contact],
      };
    }
    case EDIT:
      return {
        ...state,
        contactList: state.contactList.map((contact) =>
          contact.id === action.contact.id ? action.contact : contact
        ),
      };
    case DELETE:
      return {
        ...state,
        onSearch: false,
        contactList: state.contactList.filter(
          (contact) => contact.id !== action.contactId
        ),
      };
    case CLOSE_MODAL:
      return { ...state, modal };
    case OPEN_MODAL:
      return { ...state, modal: { ...state.modal, ...action.modal } };

    case SET_ALERT: {
      let updatedState = { ...state, alerts: [...state.alerts, action.alert] };

      if (action?.isNetworkError) {
        updatedState["loadGetAllContacts"] = false;
        updatedState["isNetworkError"] = true;
      }

      return updatedState;
    }

    case REMOVE_ALERT:
      const index = action.alert_idx;
      const alerts = [...state.alerts];
      alerts.splice(index, 1);
      return { ...state, alerts };

    case ON_SCROLL_CONTACTLIST:
      const contactList = [...state.contactList, ...(action?.contacts || [])];
      return {
        ...state,
        listItemLoading: false,
        userProfile: contactList?.[0] || null,
        contactList,
      };
    case ON_SEARCH:
      return {
        ...state,
        listItemLoading: action?.listItemLoading || false,
        userProfile: action?.contacts?.[0] ?? null,
        contactList: action?.contacts || [],
        onSearch: action?.onSearch || true,
        searchTerm: action?.searchTerm || "",
      };
    case SET_LOADING:
      return {
        ...state,
        listItemLoading: action.listItemLoading,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };

    default:
      return state;
  }
};

export { initialState, contactReducer };
