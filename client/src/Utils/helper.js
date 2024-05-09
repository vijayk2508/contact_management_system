import { contactActionConstants } from "../Context/reducer/contactConstant";

function handleModalClose(dispatch) {
  dispatch({
    type: contactActionConstants.CLOSE_MODAL,
  });
}

function successAlert(dispatch, message) {
  dispatch({
    type: contactActionConstants.SET_ALERT,
    alert: {
      type: "success",
      message,
    },
  });
}

function errorAlert(dispatch, message) {
  const isNetworkError = message === "Network Error";
  dispatch({
    type: contactActionConstants.SET_ALERT,
    alert: {
      type: "error",
      message,
    },
    isNetworkError,
  });
}

export { handleModalClose, successAlert, errorAlert };
