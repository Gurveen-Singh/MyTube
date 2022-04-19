/* Importing the action types from the actionType.js file. */
import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
} from "../actionType";

export const commentListReducer = (
  /* The initial state of the reducer. */
  state = {
    loading: true,
    comments: null,
  },
  action
) => {
  /* Destructuring the action object. */
  const { payload, type } = action;

  /* A switch statement that is checking the action type and returning the new state. */
  switch (type) {
    case COMMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_LIST_SUCCESS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case COMMENT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
