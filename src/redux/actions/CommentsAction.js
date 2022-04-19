/* Importing the request from the api folder and the action types from the actionType folder. */
import request from "../../api/Api";
import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
} from "../actionType";

/**
 * It's a function that takes an id as an argument and returns a function that takes dispatch as an
 * argument and returns an async function that dispatches an action and then dispatches another action
 * based on the result of an API call.
 * @param id - the id of the video
 */
export const getCommentsOfVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });

    const { data } = await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });
    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * It takes in a video id and a comment text, then it sends a post request to the youtube api to create
 * a comment on the video, then it dispatches a success action, then it waits 3 seconds and then it
 * dispatches a getCommentsOfVideoById action.
 * @param id - the id of the video
 * @param text - The text of the comment.
 */
export const addComment = (id, text) => async (dispatch, getState) => {
  try {
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    await request.post("/commentThreads", obj, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });

    setTimeout(() => dispatch(getCommentsOfVideoById(id)), 3000);
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
