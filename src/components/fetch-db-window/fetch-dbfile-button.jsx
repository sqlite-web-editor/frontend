import React, { useRef } from 'react';

function FDFButton({onFileUpload}) {
  const inputRef = useRef(null);

  const handleFileUpload = () => {
    if (inputRef.current) {
      const file = inputRef.current.files[0];
      if (file != undefined) {
        onFileUpload(file);
      }
    }
  };
  return (
    <>
      <button
        className="whitespace-nowrap w-full flex border-2 border-transparent items-center justify-center space-x-2 overflow-clip rounded-full p-2 sm:px-6 text-blue-800 dark:text-blue-200 bg-blue-200 dark:bg-blue-800 shadow-md hover:shadow-lg transition-shadow hover:bg-blue-300 dark:hover:bg-blue-700 text-xl"
        style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent' }}
        onClick={() => inputRef.current.click()}
      >

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden usm:block">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
        className='stroke-2 stroke-blue-800 dark:stroke-blue-200 w-6 h-6'/>
      </svg>

        <span className='text-blue-800 dark:text-blue-200'>
          Загрузить файл
        </span>

      </button>
      <input
        type="file"
        ref={inputRef}
        multiple={false}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </>
  );
}

export default FDFButton;
