import React, { useState, useRef } from "react";
import { toastError } from "../../utils/toast-error";

const maxFileSizeBytes = 1073741824; // 1 гигабайт в байтах (max значение для SQLite)

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

const getRandomFileName = () => {
  const timestamp = new Date().getTime();
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${timestamp}_${randomSuffix}`;
};

function FileEditForm({ onChange, columnIndex }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(false);
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(event, columnIndex);
      setFileName(file.name);
    }
  };

  return (
    <div>
      <button className="stdbutton shadow-md hover:shadow-md w-[190px] text-ellipsis" onClick={handleFileButtonClick}>
        {fileName? fileName: "Выберите файл"}
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
    const blob = b64toBlob(cellValue)
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = getRandomFileName();
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  if (cellValue) {
    return (
      <button className="stdbutton w-[190px] shadow-sm hover:shadow-md" onClick={handleClick}>
        Скачать файл
      </button>
    );
  }
  return (
    <div>
      Нет файла
    </div>
  );
}

function FileForm({ isEditable, cellValue, handleCellChange, columnIndex }) {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size >= maxFileSizeBytes) {
        toastError(
          "Размер файла больше или равен 1 гигабайту. Выберите файл меньшего размера."
        );
      } else {
        setFile(selectedFile);
      }
    }
  };

  return (
    <div>
      {isEditable ? (
        <FileEditForm columnIndex={columnIndex} onChange={handleCellChange}/>
      ) : (
        <FileDownloadForm cellValue={cellValue} />
      )}
    </div>
  );
}

export default FileForm;
