import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/AuthReducer";
import {
  homeVideosReducer,
  relatedVideoReducer,
  selectedVideoReducer,
} from "./reducers/VideoReducer";
import { channelDetailsReducer } from "./reducers/ChannelReducer";
import { commentListReducer } from "./reducers/CommentsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
