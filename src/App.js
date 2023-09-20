import React, { useEffect, useState } from 'react';
import './App.css';
import "./index.css";
import DbTableTookit from './components/db-table-toolkit/db-table-toolkit';
import FetchDbWindow from './components/fetch-db-window/fetch-db-window';
import Table from './components/table/Table';
import { handleFileUpload } from './utils/file-upload';
import { getTableData, getTablesNames, isServerOnline } from './utils/api-calls';
import { TableList } from './components/tables-list/TableList';
import { editTheme } from './components/fetch-db-window/utils';
import 'overlayscrollbars/overlayscrollbars.css';
import { Toaster, toast, useToasterStore } from 'react-hot-toast';
import Footer from './components/footer/Footer';

const TOAST_LIMIT = 3;


const App = () => {
  const [serverOnline, setServerOnline] = useState(true);
  const [currentTable, setCurrentTable] = useState(undefined);
  const [tables, setTables] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [columns, setColumns] = useState(undefined);
  const [theme, setTheme] = useState(undefined);
  const [currentFile, setCurrentFile] = useState();
  const { toasts } = useToasterStore();
  // true -> dark theme
  // false -> light theme

  useEffect(()=> {
    isServerOnline(setServerOnline);

    setCurrentFile(localStorage.hasOwnProperty("currentFileName") ? 
                  localStorage.getItem("currentFileName") 
                  : "")

    if (serverOnline) {
      getTablesNames()
        .then(response=>setTables(response.data.tables))
        .catch(err=>{
          localStorage.removeItem("currentFileName");
          setCurrentFile("")
        })
    }


    if (localStorage.hasOwnProperty("darkTheme")) {
      setTheme(JSON.parse(localStorage.getItem("darkTheme")));
    }

    else {
      localStorage.setItem('darkTheme', "false");
      setTheme(false);
    }
  }, []);


  useEffect(()=>{
    setData(undefined);
    setColumns(undefined);
  }, [currentFile])

  
  useEffect(()=> {
    if (currentTable) {
      getTableData(currentTable, 0, 50)
        .then(resp=>{
          let data = resp.data.data
          let row_index_buffer;
          let cell_index_buffer;

          try {
            data.map((row, rowIndex) => {
              row_index_buffer = rowIndex;
              return row.map((value, index) => {
                if (resp.data.columns[index].type === 'INTEGER') {
                  cell_index_buffer = index;
                  return BigInt(value);
                }
                return value;
              });
            });
          }
          catch {
            toast.error(`Битая колонна ${resp.data.columns[cell_index_buffer].name}, получено значение ${data[row_index_buffer][cell_index_buffer]}, ожидалось значение типа ${resp.data.columns[cell_index_buffer].type}`,
            {duration: 6000})
          }
          setData(data);
          setColumns(resp.data.columns);
        })
        .catch(err=>console.log(err));
    }
    else {
      setColumns(undefined);
      setData(undefined);
    }
  }, [currentTable]);

  // Enforce Limit
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);


  if (serverOnline & theme!=undefined) {
  return (
    <div className='w-full min-h-screen wrapper'>
      <Toaster/>
      <main className='flex flex-col lg:pt-12 items-center space-y-4 w-full h-full'>
        <div className='w-full lg:w-fit'>
          <div className='flex flex-col lg:flex-row w-full justify-center space-y-4 lg:space-y-0 lg:space-x-4'>
            <FetchDbWindow theme={theme} setTheme={setTheme} onFileUpload={(file)=>handleFileUpload(file, setTables, setServerOnline, setCurrentFile, setData, setColumns)}/>
            <div className='w-full'>
              <DbTableTookit fileName={currentFile}/>
            </div>
          </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          {
          tables ? 
            <TableList setCurrentTable={setCurrentTable} 
            tablesArray={tables} />
          : ""}

        </div>
        {
        (data&&columns) ?
          <div className='w-full flex-col flex items-center justify-center'>
            <Table key={data} columns={columns} tableData={data} tableName={currentTable}/>
          </div>
        : ""
        }
      </main>
      <div className={"w-full " + (data ? "pt-36" : "") }>
        <footer className='h-12 w-full bg-gray-50 dark:bg-gray-950 rounded-full -my-7 inline-block'/>
        <Footer/>
      </div>
    </div>
    )
  }

  else if (!serverOnline) {
    return (
      <div className='w-full h-full'>
        Связь с сервером потеряна, попробуйте позже
      </div>
    )
  }
};

export default App;
