/* Importing the firebase library and the auth library. */
import firebase from "firebase/compat/app";

/* Importing the firebase library and the auth library. */
import auth from "../../firebase";
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

/**
 * This function logs in the user and add the access token in session storage.
 */
export const login = () => async (dispatch) => {
  /* Dispatching an action to the reducer. */
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    /* Creating a new instance of the GoogleAuthProvider class. */
    const provider = new firebase.auth.GoogleAuthProvider();

    /* Adding a scope to the authentication request. */
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

    /* A function that is used to sign in the user using a popup window. */
    const res = await auth.signInWithPopup(provider);

    /* Getting the access token from the response. */
    const accessToken = res.credential.accessToken;

    /* Getting the user's name and profile picture from the response. */
    const profile = {
      name: res.additionalUserInfo.profile.name,
      photoURL: res.additionalUserInfo.profile.picture,
    };

    /* Saving the access token and user profile in the session storage. */
    sessionStorage.setItem("ytc-access-token", accessToken);
    sessionStorage.setItem("ytc-user", JSON.stringify(profile));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });
    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

/**
 * This function logs out the user and removes the access token and user from session storage.
 */
export const log_out = () => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: LOG_OUT,
  });

  sessionStorage.removeItem("ytc-access-token");
  sessionStorage.removeItem("ytc-user");
};
