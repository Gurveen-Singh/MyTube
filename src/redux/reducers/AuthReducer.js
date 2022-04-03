import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../ActionType";

const initialState = {
  accessToken: sessionStorage.getItem("myTube-access-token")
    ? sessionStorage.getItem("myTube-access-token")
    : null,
  user: sessionStorage.getItem("myTube-user")
    ? JSON.parse(sessionStorage.getItem("myTube-user"))
    : null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        accessToken: null,
        loading: false,
        error: payload,
      };
    case LOAD_PROFILE:
      return {
        ...state,
        user: payload,
      };

    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        user: null,
      };
    default:
      return state;
  }
};
