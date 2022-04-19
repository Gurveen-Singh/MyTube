/* Importing the axios library. */
import axios from "axios";

/* Creating a new instance of axios with the baseURL and params. */
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyCB2_HUQQDC-GQItFJrbLLdIMMcpXBdDdg",
  },
});

export default request;
