import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyADAFShn-_PMjhEJPq0nNpCEStbQHOKiN4",
  },
});

export default request;
