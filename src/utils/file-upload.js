import axios from "axios";
import { serverUrl } from "./api-calls";
axios.defaults.withCredentials = true

export const handleFileUpload = (file, setTables, setServerOnline) => {
  let requestData = new FormData();
  requestData.append("file", file);

  axios.post(serverUrl + '/session/create', requestData, {
    withCredentials: true
  })
    .then(response => {
      console.log(response.headers)
      return axios.get(serverUrl + '/sqlite/tables', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
    })
    .then(response => {
      setTables(response.data.tables)
      console.log(response.data.tables)
    })
    .catch(err => {
      alert(err);
    });

    return file.name
  }
