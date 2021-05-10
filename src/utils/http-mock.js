import axios from "axios"

const http = (token) => {
  return token ? axios.create({
    baseURL: "https://pure-hamlet-76363.herokuapp.com/api/v1",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + token,
    }
  }) : axios.create({
    baseURL: "https://pure-hamlet-76363.herokuapp.com/api/v1/",
    headers: {
      "Content-type": "application/json",
    }
  });
}

export default http;