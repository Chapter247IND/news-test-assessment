import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v1";
export const callAPI = (endpoint, body, method = "GET") => {
  const config = {
    method: method,
    url: endpoint,
  };

  if (body) {
    if (method.toLocaleLowerCase() === "get") {
      config.params = body;
    } else {
      config.data = body;
    }
  }

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
};
