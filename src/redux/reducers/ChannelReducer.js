/* Importing the action types from the actionType.js file. */
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

export const channelDetailsReducer = (
  /* The initial state of the reducer. */
  state = {
    loading: true,
    channel: {},
    subscriptionStatus: false,
  },
  action
) => {
  /* Destructuring the action object. */
  const { payload, type } = action;

  /* A switch statement that is checking the action type and returning the new state. */
  switch (type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        channel: payload,
        loading: false,
      };
    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        channel: null,
        loading: false,
        error: payload,
      };
    case SET_SUBSCRIPTION_STATUS:
      return {
        ...state,
        subscriptionStatus: payload,
      };
    default:
      return state;
  }
};
