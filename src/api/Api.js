import axios from "axios";

const request = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyBQMY7FVXjab3lKpQMSuADYiUmYfBj4xIM",
  },
});

export default request;
