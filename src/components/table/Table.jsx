import React, { useEffect, useRef, useState} from "react";
import { useScrollbar } from "../../hooks";
import { createTableRow, deleteTableRow, updateTableData } from "../../utils/api-calls";
import { MAX_SAFE_SQLITE_INTEGER, MIN_SAFE_SQLITE_INTEGER } from "../../app-config";
import { toast } from "react-hot-toast";
import "../../index.css";
import "./Table.css";
import { toastError } from "../../utils/toast-error";
import FileForm from "./FileForm";
//todo delete overlayscrollbars-react

const TableColumnNameCell = ({ column }) => {
  const meta = [
    column.type ? column.type: "нет типа",
    column.notnull ? "не пустой": false,
    column.dflt_value ? column.dflt_value: false,
    column.pk ? "первичный ключ": false,
    column.unique ? "уникальный": false,
    column.autoincrement ? "автоинкремент": false
  ]
    .filter(value => {
      if (value) {
        return value
      }
    })

  const showTableColumnSchema = () => toast(`${meta.join(", ")}. Полное имя: ${column.name}`, {
    duration: 3000,
    className: "rounded-lg bg-blue-50 border-2 border-blue-900 dark:border-blue-50 dark:bg-gray-800 dark:text-white lg:min-w-[24rem]"
  })
  
  return (
    <th className="w-fit">
      <button className="px-2 overflow-hidden text-ellipsis rounded-full p-2 bg-2 hover:bg-gray-400 dark:hover:bg-gray-700 w-full" onClick={()=>showTableColumnSchema()}
      style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent' }}>
        {column.name}
      </button>
    </th>
  );
}


const TableCell = ({ rowIndex, columnIndex, cellValue, isEditable, editedData, handleCellChange, columns }) => {
  const columnType = columns[columnIndex].type;
  return (
    <td>
      <div className="cell">
        <span>
          {
            columnType === "BLOB" ? (
              <FileForm isEditable={isEditable} cellValue={cellValue}/>
            ):
              isEditable ? (
                columnType === "BOOLEAN" ? (
                  <input
                    type="checkbox"
                    checked={editedData[columnIndex]}
                    onChange={(e) => handleCellChange(e, columnIndex)}
                  />
                ) : (
                  <input
                    className="table_input"
                    type="text"
                    value={editedData[columnIndex]}
                    onChange={(e) => handleCellChange(e, columnIndex)}
                  />
                )
              ) : (
                columnType === "BOOLEAN" ? (
                  <input type="checkbox" checked={cellValue} readOnly />
                ) : (
                  cellValue
                )
              )
          }
        </span>
      </div>
    </td>
  );
}


const SaveButton = ({rowIndex, handleSaveRow}) => {
  return (
    <button className="shadow-md hover:shadow-lg transition-shadow hover:bg-green-300 dark:hover:bg-green-700 bg-green-200 dark:bg-green-800 border-2 border-transparent rounded-xl p-2"
      onClick={() => handleSaveRow(rowIndex)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"
        className="stroke-2 stroke-green-800 dark:stroke-green-200" />
      </svg>
    </button> 
    );
}


const EditButton = ({ rowIndex, handleEditRow }) => {
  return (
    <button className="shadow-md hover:shadow-lg transition-shadow hover:bg-blue-300 dark:hover:bg-blue-700 bg-blue-200 dark:bg-blue-800 border-2 border-transparent rounded-xl p-2"
    onClick={() => handleEditRow(rowIndex)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" 
        className="stroke-2 stroke-blue-800 dark:stroke-blue-200"/>
      </svg>
    </button>
  );
};


const CancelButton = ({ rowIndex, handleCancelEdit }) => {
  return (
    <button className="shadow-md hover:shadow-lg transition-shadow hover:bg-red-300 dark:hover:bg-red-700 bg-red-200 dark:bg-red-800 border-2 border-transparent rounded-xl p-2"
    onClick={() => handleCancelEdit(rowIndex)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" 
          className="stroke-2 stroke-red-800 dark:stroke-red-200"/>
        </svg>
    </button>
  );
};


const DeleteButton = ({ rowIndex, handleDeleteRow }) => {
  return (
    <button className="shadow-md hover:shadow-lg transition-shadow hover:bg-red-300 dark:hover:bg-red-700 bg-red-200 dark:bg-red-800 border-2 border-transparent rounded-xl p-2"
    onClick={() => handleDeleteRow(rowIndex)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
          className="stroke-2 stroke-red-800 dark:stroke-red-200"/>
        </svg>
    </button>
  );
};

const TableRow = ({ row, rowIndex, columns, editableRowIndex, editedData, handleCellChange, handleEditRow, handleDeleteRow, handleCancelEdit }) => {
  const isEditable = editableRowIndex === rowIndex;
  let isNew = false;
  return (
    <tr key={rowIndex}>
      {row.map((cell, columnIndex) => (
        <TableCell
          key={columnIndex}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          cellValue={cell}
          isEditable={isEditable}
          editedData={editedData}
          handleCellChange={handleCellChange}
          columns={columns}
        />
      ))}
      <td className="pl-4 w-0">
        {isEditable ? (
          <div className="space-x-4 flex justify-end min-w-fit">
            <SaveButton rowIndex={rowIndex} handleSaveRow={handleEditRow}/>
            <CancelButton rowIndex={rowIndex} handleCancelEdit={handleCancelEdit}/>
          </div>
        ) : (
          <div className="space-x-4 flex justify-end min-w-fit">
            <EditButton rowIndex={rowIndex} handleEditRow={handleEditRow} />
            <DeleteButton rowIndex={rowIndex} handleDeleteRow={handleDeleteRow} />
          </div>
        )}
      </td>
    </tr>
  );
};


const AddRowButton = ({ handleAddRow }) => {
  return <button
    className="shadow-md dark:bg-green-300 hover:shadow-lg transition-shadow hover:bg-green-800 dark:hover:bg-green-400 bg-green-600 border-2 border-transparent rounded-3xl w-full md:max-w-[50%] h-[48px]"
    onClick={handleAddRow}><b className="text-white dark:text-green-900 font-bold">Добавить строку</b></button>
};


const Table = ({ columns, tableData, tableName, decTableRowCount, incTableRowCount }) => {
  const [data, setData] = useState(tableData);
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [newRowIndex, setNewRowIndex] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const tableRef = useRef(null);

  //scrolling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    const isDraggingClick = e.target.tagName === 'TD' || e.target.tagName === 'TH';
    if (isDraggingClick) {
      setIsDragging(true);
      setStartX(e.pageX);
      setScrollLeft(tableRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    tableRef.current.style.cursor = 'grabbing';
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    tableRef.current.scrollLeft = scrollLeft - walk;
  };
  // также для mouseout используется
  const handleMouseUp = () => {
    tableRef.current.style.cursor = "default";
    setIsDragging(false);
    setStartX(null);
  };


  // короче наблюдает когда нажимаем на едит и сейв
  const handleEditRow = (rowIndex) => {
    if (editableRowIndex && editableRowIndex !== rowIndex) {
      toastError("Сначало завершите изменения")
      return;
    }
    let isNull = false;
    let autoincrement_index = null;
    let nullIndex = null;
    let cantnull_indices = [];
    let unique_indices = [];

    // когда сейв
    if (rowIndex === editableRowIndex) {
      const oldData = data[rowIndex];
      let updatedData = [...data];

      columns.forEach((column, index) => {
        if (column.unique || column.pk) {
          unique_indices.push(index);
        }
        if (column.autoincrement) {
          autoincrement_index = index;
        }

        if (column.notnull) {
          cantnull_indices.push(index);
        }
      })

      editedData.forEach((value, index) => {
        let column = columns[index]
        
        if (column.type=="INTEGER" && value == "-") {
          toastError(`${column.name} ожидается число, а не '-'`)
          isNull=true;
          return;
        }

        if (column.notnull && (value == "") ) {
          if (column.autoincrement && newRowIndex==editableRowIndex) {
            return;
          }
          isNull = true;
          nullIndex = index;
          toastError(`${column.name} не может быть пустой`);
        }
      })

      if (isNull) {
        return;
      }
      
      updatedData[rowIndex] = editedData;
      const updatedRowData = updatedData[rowIndex];

      if (newRowIndex===rowIndex) {
        createTableRow(tableName, updatedRowData, columns)
          .then(
            res=>{
              if (autoincrement_index!==null) {
                updatedData = res.data;
                let buf = [...data];
                buf[rowIndex] = Object.values(updatedData);
                setData(buf);
              }
              incTableRowCount();
            }
          )
          .catch(
            err => {
              toastError(err.response.data.detail)
              setEditableRowIndex(null);
              setEditedData([]);
              setNewRowIndex(null);

              let buf = [...data]; 
              buf.pop()
              setData(buf)
            }
          )
      }

      else {
        updateTableData(tableName, updatedRowData, oldData, columns)
          .catch(
            err => {
              toastError(err.response.data.detail)
              setData(data);
              setEditableRowIndex(null);
              setEditedData([]);
              setNewRowIndex(null);
            }
          )
      }

      setEditableRowIndex(null);
      setEditedData([]);
      setNewRowIndex(null);
      setData(updatedData);

    } else {
      // когда edit
      setEditableRowIndex(rowIndex);
      setEditedData(data[rowIndex]);
    }
  };

  

  const handleCellChange = (e, columnIndex) => {
    const updatedEditedData = [...editedData];
    const column = columns[columnIndex];

    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (column.type === "INTEGER" && value !== "" && value !== "-") {
      try {
        let bigIntValue = BigInt(value);

        if (bigIntValue > MAX_SAFE_SQLITE_INTEGER) {
          toastError(`Максимальное числовое значение поддерживаемое sqlite - ${MAX_SAFE_SQLITE_INTEGER.toString()}`)
          throw new Error();
        }

        else { 
          if (bigIntValue < MIN_SAFE_SQLITE_INTEGER) {
            toastError(`Минимальное числовое значение поддерживаемое sqlite - ${MIN_SAFE_SQLITE_INTEGER.toString()}`)
            throw new Error();
          }
        }

        value = bigIntValue.toString();
      }
      catch {
        value = editedData[columnIndex];
      }
    }

    updatedEditedData[columnIndex] = value;
    setEditedData(updatedEditedData);
  };

  const handleDeleteRow = (rowIndex) => {
    if (editableRowIndex && editableRowIndex !== rowIndex) {
      toastError("Сначало завершите изменения")
      return;
    }
    const updatedData = [...data];
    updatedData.splice(rowIndex, 1);
    setData(updatedData);
    
    // чтобы когда по новоиспеченному row тыкали cancel не отправлять реквест
    if (!editableRowIndex) {
      deleteTableRow(tableName, data[rowIndex], columns);
      decTableRowCount();
    }
  };


  const handleAddRow = () => {
    if (editableRowIndex) {
      toastError("Сначало завершите изменения")
      return;
    }
    const newRow = columns.map((column) => {
      if (column.notnull && !column.autoincrement) {
        return "";
      } else if (column.autoincrement) {
        return "";
      } else {
        return column.dflt_value || "";
      }
    });
    const updatedData = [...data, newRow];
    setData(updatedData);
    setNewRowIndex(updatedData.length - 1)
    setEditableRowIndex(updatedData.length - 1);
    setEditedData(newRow);
  };


  const handleCancelEdit = () => {
    setEditableRowIndex(null);
    setEditedData([]);
    if (newRowIndex != null) {
      handleDeleteRow(newRowIndex);
      setNewRowIndex(null);
    }
  };


  return (
    <>
      <div className="w-full pt-4 pb-12 bg-1 rounded-xl shadow-lg dark:dark-overlow-style overflow-style overflow-auto" 
      ref={tableRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
        <table className="space-y-2 w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <React.Fragment key={column.cid}>
                  <TableColumnNameCell column={column}/>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                row={row}
                rowIndex={rowIndex}
                columns={columns}
                editableRowIndex={editableRowIndex}
                editedData={editedData}
                handleCellChange={handleCellChange}
                handleEditRow={handleEditRow}
                handleDeleteRow={handleDeleteRow}
                handleCancelEdit={handleCancelEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center items-center py-4">
        <AddRowButton handleAddRow={handleAddRow}/>
      </div>
    </>
  );
};

export default Table;
