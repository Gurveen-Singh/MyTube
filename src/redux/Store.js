import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/AuthReducer";
import { homeVideosReducer } from "./reducers/VideoReducer";

const reducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
});

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
