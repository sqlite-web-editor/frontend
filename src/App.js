import React, { useEffect, useState } from 'react';
import './App.css';
import "./index.css";
import DbTableTookit from './components/db-table-toolkit/db-table-toolkit';
import FetchDbWindow from './components/fetch-db-window/fetch-db-window';
import Table from './components/table/Table';
import { handleFileUpload } from './utils/file-upload';
import { getTableData, getTableRowCount, getTablesNames, isServerOnline } from './utils/api-calls';
import { TableList } from './components/tables-list/TableList';
import 'overlayscrollbars/overlayscrollbars.css';
import { Toaster, toast, useToasterStore } from 'react-hot-toast';
import Footer from './components/footer/Footer';
import Pagination from './components/pagination/Pagination';
import { toastError } from './utils/toast-error';
import { getUserTheme } from './utils/getUserTheme';


const TOAST_LIMIT = 3;


const App = () => {
  const [serverOnline, setServerOnline] = useState(true);
  const [currentTable, setCurrentTable] = useState(undefined);
  const [tables, setTables] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [columns, setColumns] = useState(undefined);
  const [tableRowCount, setTableRowCount] = useState(undefined);
  const [theme, setTheme] = useState(undefined);
  const [currentFile, setCurrentFile] = useState();
  const [rowsPerRequest, setRowsPerRequest] = useState(25);
  const { toasts } = useToasterStore();
  // true -> dark theme
  // false -> light theme
  const decTableRowCount = ()=> setTableRowCount(tableRowCount-1)
  const incTableRowCount = ()=> setTableRowCount(tableRowCount+1)

  const updateData = (start, end) => {
    getTableRowCount(currentTable).then(resp=>setTableRowCount(resp.data))
    getTableData(currentTable, start, end)
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
          toastError(`Битая колонна ${resp.data.columns[cell_index_buffer].name}, получено значение ${data[row_index_buffer][cell_index_buffer]}, ожидалось значение типа ${resp.data.columns[cell_index_buffer].type}`,
          {duration: 6000})
        }
        setData(data);
        setColumns(resp.data.columns);
      })
      .catch(err=>console.log(err));
  }


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
      const userSysTheme = getUserTheme();
      localStorage.setItem('darkTheme', `${userSysTheme}`);
      setTheme(userSysTheme);
    }
  }, []);


  useEffect(()=>{
    setData(undefined);
    setColumns(undefined);
    setCurrentTable(undefined);
  }, [currentFile])

  
  useEffect(()=> {
    if (currentTable) {
      updateData(0, rowsPerRequest)
    }
    else {
      setColumns(undefined);
      setData(undefined);
    }
  }, [currentTable]);


  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
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
              <Table key={data} columns={columns} tableData={data} tableName={currentTable} decTableRowCount={decTableRowCount} incTableRowCount={incTableRowCount}/>
              <Pagination updateData={updateData} currentTable={currentTable} rowCount={tableRowCount} rowsPerRequest={rowsPerRequest} setRowsPerRequest={setRowsPerRequest}/>
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
