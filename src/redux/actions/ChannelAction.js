/* Importing the request function from the api/Api.js file and the action types from the actionType.js
file. */
import request from "../../api/Api";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

/**
 * It's a function that takes an id as an argument and returns a function that takes a dispatch
 * function as an argument.
 *
 * The returned function is an async function that dispatches an action of type
 * CHANNEL_DETAILS_REQUEST, then makes an API call to the YouTube API, and then dispatches an action of
 * type CHANNEL_DETAILS_SUCCESS with the data from the API call as the payload.
 *
 * If the API call fails, it dispatches an action of type CHANNEL_DETAILS_FAIL with the error response
 * from the API call as the payload.
 *
 * The function is exported so that it can be imported into the component that needs it.
 * @param id - The id of the channel you want to get details for.
 */
export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });

    const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    });
    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

/**
 * It checks if the user is subscribed to a channel and sets the subscription status in the redux
 * store.
 * @param id - The channel ID of the channel you want to check the subscription status of.
 */
export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};
