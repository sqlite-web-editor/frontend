import { useState } from "react";


const RowCountButton = ({ value, rowsPerRequest, setRowsPerRequest, setOldRPR, color }) => {
  const handleClick = () => {
    setOldRPR(rowsPerRequest);
    setRowsPerRequest(value);
  };

  const isActive = rowsPerRequest === value;

  return (
    <button
      className={`${
        isActive
          ? `shadow-lg hover:bg-${color}-300 dark:hover:bg-${color}-700 bg-${color}-200 dark:bg-${color}-800 text-${color}-800 dark:text-${color}-200`
          : 'bg-gray-200 hover:bg-gray-300 text-gray-950 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
      } py-2 px-6 rounded-full transition-shadow`}
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
    <div className="flex w-full md:w-fit items-center justify-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full shadow-lg p-4">
      <RowCountButton value={10} color="green" rowsPerRequest={rowsPerRequest} setRowsPerRequest={setRowsPerRequest} setOldRPR={setOldRPR} />
      <RowCountButton value={25} color="amber" rowsPerRequest={rowsPerRequest} setRowsPerRequest={setRowsPerRequest} setOldRPR={setOldRPR} />
      <RowCountButton value={50} color="red" rowsPerRequest={rowsPerRequest} setRowsPerRequest={setRowsPerRequest} setOldRPR={setOldRPR} />
    </div>
  );
};

export default SelectRange;
