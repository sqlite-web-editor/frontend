import axios from "axios";
import { getTablesNames, serverUrl } from "./api-calls";
import { toastError } from "./toast-error";
axios.defaults.withCredentials = true

export const handleFileUpload = (file, setTables, setServerOnline, setCurrentFile, setData, setColumns) => {
  let requestData = new FormData();
  requestData.append("file", file);
  localStorage.setItem("currentFileName", file.name);
  setCurrentFile(file.name);

  axios.post(serverUrl + '/session/create', requestData, {
    withCredentials: true
  })
    .then(response => {
      return getTablesNames()
    })
    .then(response => {
      setTables(response.data.tables)
    })
    .catch(err => {
      setCurrentFile("");
      toastError(err.response.data.detail);
      localStorage.removeItem("currentFileName");
      setData(undefined);
      setColumns(undefined);
      setTables(undefined);
    });

  }
