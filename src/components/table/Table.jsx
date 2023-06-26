import React, { useState } from "react";

const TableCell = ({ rowIndex, columnIndex, cellValue, isEditable, editedData, handleCellChange, columns }) => {
  const columnType = columns[columnIndex].type;

  if (isEditable) {
    return (
      <td>
        {columnType === "BOOLEAN" ? (
          <input
            type="checkbox"
            checked={editedData[columnIndex]}
            onChange={(e) => handleCellChange(e, columnIndex)}
          />
        ) : (
          <input
            type="text"
            value={editedData[columnIndex]}
            onChange={(e) => handleCellChange(e, columnIndex)}
          />
        )}
      </td>
    );
  } else {
    return (
      <td>
        {columnType === "BOOLEAN" ? (
          <input type="checkbox" checked={cellValue} readOnly />
        ) : (
          cellValue
        )}
      </td>
    );
  }
};

const EditButton = ({ rowIndex, handleEditRow }) => {
  return (
    <button onClick={() => handleEditRow(rowIndex)}>Edit</button>
  );
};

const DeleteButton = ({ rowIndex, handleDeleteRow }) => {
  return (
    <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
  );
};

const TableRow = ({ row, rowIndex, columns, editableRowIndex, editedData, handleCellChange, handleEditRow, handleDeleteRow, handleCancelEdit }) => {
  const isEditable = editableRowIndex === rowIndex;

  return (
    <tr>
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
          <>
            <button onClick={() => handleEditRow(rowIndex)}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <EditButton rowIndex={rowIndex} handleEditRow={handleEditRow} />
            <DeleteButton rowIndex={rowIndex} handleDeleteRow={handleDeleteRow} />
          </>
        )}
      </td>
    </tr>
  );
};

const AddRowButton = ({ handleAddRow }) => {
  return <button onClick={handleAddRow}>Add Row</button>;
};

const Table = ({ columns, tableData }) => {
  const [data, setData] = useState(tableData);
  const [editableRowIndex, setEditableRowIndex] = useState(null);
  const [editedData, setEditedData] = useState([]);

  const handleEditRow = (rowIndex) => {
    if (rowIndex === editableRowIndex) {
      const updatedData = [...data];
      updatedData[rowIndex] = editedData;
      setData(updatedData);
      setEditableRowIndex(null);
      setEditedData([]);
    } else {
      setEditableRowIndex(rowIndex);
      setEditedData(data[rowIndex]);
    }
  };

  const handleCellChange = (e, columnIndex) => {
    const updatedEditedData = [...editedData];
    const column = columns[columnIndex];
    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (column.type === "INTEGER" && value !== "") {
      const intValue = parseInt(value);
      if (!isNaN(intValue)) {
        value = intValue;
      }
    }

    updatedEditedData[columnIndex] = value;
    setEditedData(updatedEditedData);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = [...data];
    updatedData.splice(rowIndex, 1);
    setData(updatedData);
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
    setEditableRowIndex(updatedData.length - 1);
    setEditedData(newRow);
  };

  const handleCancelEdit = () => {
    setEditableRowIndex(null);
    setEditedData([]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.cid}>{column.name}</th>
            ))}
            <th>Actions</th>
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
      <AddRowButton handleAddRow={handleAddRow} />
    </div>
  );
};

export default Table;
