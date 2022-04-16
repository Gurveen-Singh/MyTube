import axios from "axios";
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    // key: process.env.REACT_APP_MY_TUBE_KEY,
    key: "AIzaSyCB2_HUQQDC-GQItFJrbLLdIMMcpXBdDdg",
  },
});

export default request;
