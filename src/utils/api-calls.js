import axios from "axios";

export const serverUrl = "http://192.168.1.107:8000"


export const isServerOnline = (setServerOnline) => {
  axios.get(serverUrl+"/", {
    withCredentials: true
  })
  .then(()=>setServerOnline(true))
  .catch((error)=>{
    setServerOnline(false)
  })
}

export const getTablesNames = () => {
  return axios.get(serverUrl + '/sqlite/tables', {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const deleteSession = () => {
  return axios.delete(serverUrl + '/session/delete', {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const getTableData = (tableName, from, to) => {
  return axios.get(serverUrl + `/sqlite/tables/${tableName}/content/${from}/${to}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const updateTableData = (tablename, newData, oldData,  columns) => {
  let values = {
    confirmation_values: {},
    updated_values: {}
  };

  for (let i = 0; i < newData.length; i++) {
    const columnName = columns[i].name;
    let columnValue = newData[i];
    if (columns[i].type == "BOOLEAN") {
      columnValue = +columnValue;
    }
    values.updated_values[columnName] = columnValue;
  }

  for (let i = 0; i < oldData.length; i++) {
    const columnName = columns[i].name;
    let columnValue = oldData[i];
    values.confirmation_values[columnName] = columnValue;
  }
  return axios.patch(serverUrl+`/sqlite/tables/${tablename}/content`,
    values,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}


export const createTableRow = (tableName, newData, columns) => {
  const values = {}

  for (let i = 0; i < newData.length; i++) {
    const columnName = columns[i].name;
    let columnValue = newData[i];
    if (columns[i].type == "BOOLEAN") {
      columnValue = +columnValue;
    }

    if (columns[i].autoincrement && (columnValue === "" || columnValue===null)) {
      continue // для полей с автоинкрементом и не установленным значением
    }

    values[columnName] = columnValue;
  }

  return axios.post(serverUrl+`/sqlite/tables/${tableName}/content`,
    values,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}


export const deleteTableRow = (tableName, rowData, columns) => {
  const confirmation_values = {}
  for (let i = 0; i < rowData.length; i++) {
    const columnName = columns[i].name;
    let columnValue = rowData[i];
    if (columns[i].type == "BOOLEAN") {
      columnValue = +columnValue;
    }
    confirmation_values[columnName] = columnValue;
  }
  console.log(tableName, rowData, columns)
  return axios.delete(serverUrl+`/sqlite/tables/${tableName}/content?limit=1`,
    {
      data: confirmation_values
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

export const getSqliteFile = async () => {
  const response = await axios.get(serverUrl+'/sqlite/download', { responseType: 'blob', withCredentials: true });
  return response;
};
