import axios from "axios";

export const serverUrl = "http://194.58.97.187:8000"


export const isServerOnline = (setServerOnline) => {
  axios.get(serverUrl+"/", {
    withCredentials: true
  })
  .then(()=>setServerOnline(true))
  .catch((error)=>{
    setServerOnline(true)
    alert(error)
  })
}