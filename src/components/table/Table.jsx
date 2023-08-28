import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import "./Table.css";
import { useScrollbar } from "../../hooks";
import { createTableRow, deleteTableRow, updateTableData } from "../../utils/api-calls";
import { MAX_SAFE_SQLITE_INTEGER, MIN_SAFE_SQLITE_INTEGER } from "../../app-config";
import { toast } from "react-hot-toast";
import { ScrollbarWrapper } from "../scrollbar-wrapper/scrollbar-wrapper";
//todo delete overlayscrollbars-react

const TableCell = ({ rowIndex, columnIndex, cellValue, isEditable, editedData, handleCellChange, columns }) => {
  const tableCellRef = useRef(null);
  const tdRef = useRef(null);
  const columnType = columns[columnIndex].type;
  const [hasScroll, setHasScroll] = useState(true);
  const canScroll = (columnType != "BOOLEAN");

  const handleOverflow = (divRef) => {
    if (divRef.current) {
    }
  }

  const handleScrollbarDestroy = (divRef) => {
    if (divRef.current) {
    }
  }
  

  useEffect(()=> {
    if (canScroll) {
      setHasScroll(!isEditable)
    }
    else {
      setHasScroll(false)
    }
  }, [isEditable])

  // useScrollbar(tableCellRef, hasScroll, handleOverflow, handleScrollbarDestroy, rowIndex);
  

  return (
    <td>
      <ScrollbarWrapper hasScroll={hasScroll} onOverflow={handleOverflow} onScrollbarDestroy={handleScrollbarDestroy} forceUpdate={rowIndex}>
        <div ref={tableCellRef} className="cell">
          {isEditable ? (
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
          )}
        </div>
      </ScrollbarWrapper>
    </td>
  );
}


const EditButton = ({ rowIndex, handleEditRow }) => {
  return (
    <button className="shadow-md border-2 border-blue-400 bg-blue-400/30 dark:border-blue-300 dark:bg-blue-300/10 rounded-xl p-1"
    onClick={() => handleEditRow(rowIndex)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" 
        className="fill-blue-400/10 stroke-blue-950 dark:fill-blue-300/10 dark:stroke-blue-100"/>
      </svg>
    </button>
  );
};

const DeleteButton = ({ rowIndex, handleDeleteRow }) => {
  return (
    <button className="shadow-md border-2 border-red-400 bg-red-400/30 dark:border-red-300 dark:bg-red-300/10 rounded-xl p-1"
    onClick={() => handleDeleteRow(rowIndex)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
          className="fill-red-400/10 stroke-red-950 dark:fill-red-300/10 dark:stroke-red-100"/>
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
      <td>
        {isEditable ? (
          <div className="flex justify-end">
            <button onClick={() => handleEditRow(rowIndex)}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <div className="space-x-4 flex justify-end">
            <EditButton rowIndex={rowIndex} handleEditRow={handleEditRow} />
            <DeleteButton rowIndex={rowIndex} handleDeleteRow={handleDeleteRow} />
          </div>
        )}
      </td>
    </tr>
  );
};

const AddRowButton = ({ handleAddRow }) => {
  return <button className="rounded-xl shadow-md p-1 border-2 bg-green-400/30 border-green-400 dark:bg-green-300/10 dark:border-green-300"
  onClick={handleAddRow}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"
      className="fill-green-400/10 stroke-green-950 dark:fill-green-300/10 dark:stroke-green-100" />
    </svg>
  </button>;
};

const Table = ({ columns, tableData, tableName }) => {
  const [data, setData] = useState(tableData);
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [newRowIndex, setNewRowIndex] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const tableRef = useRef(null);
  useScrollbar(tableRef, true)

  // короче наблюдает когда нажимаем на едит и сейв
  const handleEditRow = (rowIndex) => {
    let isNull = false;
    let isUnique = true;
    let nullIndex = null;
    let indices = [];

    // когда сейв
    if (rowIndex === editableRowIndex) {
      const oldData = data[rowIndex];
      const updatedData = [...data];
      
      columns.forEach((column, index) => {
        if (column.pk) {
          indices.push(index)
        }
      })
      
      editedData.forEach((newValue, newValueIndex) => {
        if (indices.includes(newValueIndex)) {
          data.forEach((value_in_db, index) => {
            if (index==editableRowIndex) {
              return;
            }
            if (newValue == value_in_db[newValueIndex]) {
              // почему то index тут иногда бывает неверным, короче будь осторожнее
              // когда будешь расширять это
              toast.error(`${columns[newValueIndex].name} должен быть уникальный`);
              isUnique = false;
              return;
            }
          })
        }
      })

      if (!isUnique) {
        return;
      }

      editedData.forEach((value, index) => {
        let column = columns[index]
        if (column.notnull && (value == "" || (column.type=="INTEGER" && value == "-")) ) {
          isNull = true;
          nullIndex = index;
          toast.error(`${column.name} не может быть пустой`);
        }
      })

      if (isNull) {
        return;
      }
      //
      updatedData[rowIndex] = editedData;
      setData(updatedData);
      setEditableRowIndex(null);
      setEditedData([]);
      const updatedRowData = updatedData[rowIndex];

      if (newRowIndex===rowIndex) {
        createTableRow(tableName, updatedRowData, columns).then(res=>console.log(res))
      }

      else {
        updateTableData(tableName, updatedRowData, oldData, columns).then(res=>console.log(res))
      }

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
          toast.error(`Максимальное числовое значение поддерживаемое sqlite - ${MAX_SAFE_SQLITE_INTEGER.toString()}`)
          throw new Error();
        }

        else { 
          if (bigIntValue < MIN_SAFE_SQLITE_INTEGER) {
              bigIntValue=MIN_SAFE_SQLITE_INTEGER
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
    if (editableRowIndex && editableRowIndex != rowIndex) {
      toast.error("Сначало завершите изменения")
      return;
    }
    const updatedData = [...data];
    updatedData.splice(rowIndex, 1);
    setData(updatedData);
    
    // чтобы когда по новоиспеченному row тыкали cancel не отправлять реквест
    if (!editableRowIndex) {
      deleteTableRow(tableName, data[rowIndex], columns).then(res=>console.log(res));
    }
  };

  const handleAddRow = () => {
    const newRow = columns.map((column) => {
      if (column.notnull && !column.autoincrement) {
        return "";
      } else if (column.autoincrement) {
        return null;
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
      <div className="w-full p-4 pb-12 bg-1 rounded-xl shadow-lg" ref={tableRef}>
        <table className="space-y-2 w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.cid}>{column.name}</th>
              ))}
            <th>
            </th>
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
      <div className="w-full flex justify-end p-4">
        <AddRowButton handleAddRow={handleAddRow}/>
      </div>
    </>
  );  
};

export default Table;
