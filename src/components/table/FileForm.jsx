import React, { useState, useRef } from "react";
import { toastError } from "../../utils/toast-error";


const maxFileSizeBytes = 1073741824; // 1 гигабайт в байтах (max значение для SQLite)


const getRandomFileName = () => {
  const timestamp = new Date().getTime();
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${timestamp}_${randomSuffix}`;
};


function FileEditForm({ onChange }) {
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div>
      <button className="stdbutton" onClick={handleFileButtonClick}>
        Выберите файл
      </button>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
}

function FileDownloadForm({ cellValue }) {
  const handleClick = () => {
    const blob = new Blob([cellValue], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = getRandomFileName();
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <button className="stdbutton" onClick={handleClick}>
      Скачать файл
    </button>
  );
}


function FileForm({ isEditable, cellValue }) {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size >= maxFileSizeBytes) {
        toastError("Размер файла больше или равен 1 гигабайту. Выберите файл меньшего размера.");
      } else {
        setFile(selectedFile);
      }
    }
  };

  return (
    <div>
      {isEditable? <FileEditForm/>
        : <FileDownloadForm cellValue={cellValue}/>}
    </div>
  );
}

export default FileForm;
