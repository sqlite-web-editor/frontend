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
        className="whitespace-nowrap w-full rounded-xl py-2 px-6 text-blue-800 dark:text-blue-200 bg-blue-200 dark:bg-blue-800 shadow-md hover:shadow-lg transition-shadow hover:bg-blue-300 dark:hover:bg-blue-700 text-xl"
        style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent' }}
        onClick={() => inputRef.current.click()}
      >
        Загрузить файл
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
