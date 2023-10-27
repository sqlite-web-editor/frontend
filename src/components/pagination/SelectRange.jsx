import { useState } from "react";


const RowCountButton = ({ value, rowsPerRequest, setRowsPerRequest, setOldRPR }) => {
  const handleClick = () => {
    setOldRPR(rowsPerRequest);
    setRowsPerRequest(value);
  };

  const isActive = rowsPerRequest === value;

  return (
    <button
      className={`${
        isActive
          ? 'shadow-lg hover:bg-blue-300 dark:hover:bg-blue-700 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-950 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
      } py-2 px-4 border-2 border-transparent rounded-full transition-shadow p-2`}
      onClick={handleClick}
      style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent' }}
    >
      {
        isActive 
        ? (
            <b>
              {value}
            </b> 
          )
          
        : (
          value
        )
      }
    </button>
  );
};


const SelectRange = ({ rowsPerRequest, setRowsPerRequest, setOldRPR }) => {
  return (
    <div className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full w-fit shadow-lg p-2">
      <RowCountButton value={5} rowsPerRequest={rowsPerRequest} setRowsPerRequest={setRowsPerRequest} setOldRPR={setOldRPR} />
      <RowCountButton value={25} rowsPerRequest={rowsPerRequest} setRowsPerRequest={setRowsPerRequest} setOldRPR={setOldRPR} />
      <RowCountButton value={50} rowsPerRequest={rowsPerRequest} setRowsPerRequest={setRowsPerRequest} setOldRPR={setOldRPR} />
    </div>
  );
};

export default SelectRange;
