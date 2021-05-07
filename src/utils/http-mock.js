import axios from "axios"

const http = (token) => {
  return token ? axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + token,
    }
  }) : axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
      "Content-type": "application/json",
    }
  });
}

export default http;