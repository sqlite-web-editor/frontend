import React, { useRef } from 'react';

function FDFButton() {
  const inputRef = useRef(null);

  const handleFileUpload = () => {
    if (inputRef.current) {
      const file = inputRef.current.files[0];
    }
  };

  return (
    <>
      <button
        className="whitespace-nowrap w-full rounded-xl py-2 px-6 bg-blue-300/30 text-blue-600 hover:bg-blue-400/30 shadow-md text-xl hover:-skew-x-12
        dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
        style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent' }}
        onClick={() => inputRef.current.click()}
      >
        Upload file
      </button>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </>
  );
}

export default FDFButton;
