import React, { useEffect, useState } from 'react';
import './App.css';
import "./index.css";
import DbTableTookit from './components/db-table-toolkit/db-table-toolkit';
import FetchDbWindow from './components/fetch-db-window/fetch-db-window';
import Table from './components/table/Table';
import { handleFileUpload } from './utils/file-upload';
import { isServerOnline } from './utils/api-calls';
import { TableList } from './components/tables-list/TableList';


const columns = [
  {
    cid: 0,
    name: 'id',
    type: 'INTEGER',
    notnull: true,
    dflt_value: null,
    pk: true,
    autoincrement: false,
  },
  {
    cid: 1,
    name: 'banned',
    type: 'BOOLEAN',
    notnull: false,
    dflt_value: null,
    pk: false,
    autoincrement: false,
  },
  {
    cid: 2,
    name: 'discord_id',
    type: 'INTEGER',
    notnull: false,
    dflt_value: null,
    pk: false,
    autoincrement: false,
  },
];

const data = [
  [1, true, 123456],
  [2, false, 789012],
];


const App = () => {
  const [serverOnline, setServerOnline] = useState(true);
  const [currentTable, setCurrentTable] = useState(undefined);
  const [tables, setTables] = useState(undefined);

  useEffect(()=> {
    isServerOnline(setServerOnline)
  }, [])
  if (serverOnline) {
  return (
    <div className='w-full h-full'>
      <div className='flex flex-col pt-4 lg:pt-12 justify-center items-center space-y-4'>
        <div className='w-full lg:w-fit'>
          <div className='flex flex-col lg:flex-row w-full justify-center space-y-4 lg:space-y-0 lg:space-x-4'>
            <FetchDbWindow onFileUpload={(file)=>handleFileUpload(file, setTables, setServerOnline)}/>
            <div className='w-full'>
              <DbTableTookit/>
            </div>
          </div>
        </div>
        <div className='max-w-[64rem]'>
          {
          tables ? 
          <TableList setCurrentTable={setCurrentTable} 
          tablesArray={tables} />: ""}
        </div>
      </div>
    </div>
    )
  }

  else {
    return (
      <div className='w-full h-full text-3xl'>
        server is offline, try again later
      </div>
    )
  }
};

export default App;
