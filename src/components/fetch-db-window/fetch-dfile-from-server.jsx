import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getSqliteFile } from '../../utils/api-calls';
import { toastError } from '../../utils/toast-error';

export const FetchDbFileFromServer = () => {
  const getRandomFileName = () => {
    const timestamp = new Date().getTime();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `sqlite_web_editor_${timestamp}_${randomSuffix}.db`;
  };

  const handleClick = async () => {
    try {
      const fileName = getRandomFileName();
      const response = await getSqliteFile();
      const blob = new Blob([response.data], { type: 'application/sqlite' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      const status = error.response.status;
      if (status===405) {
        toastError("Сначало загрузите файл.")
        return;
      }
      toastError("Ошибка скачивания файла sqlite.");
    }
  };
  

  return (
    <>
      <button
        onClick={handleClick}
        className="whitespace-nowrap h-[48px] min-w-[48px] xs:w-full flex items-center justify-center space-x-2 sm:px-6 shadow-md hover:shadow-lg transition-shadow hover:bg-blue-300 dark:hover:bg-blue-700 bg-blue-200 dark:bg-blue-800 border-2 border-transparent rounded-full p-2 text-xl"
        style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" 
          className="stroke-2 stroke-blue-800 dark:stroke-blue-200 w-6 h-6"/>
        </svg>
        <span className='text-blue-800 dark:text-blue-200 hidden xs:block'>Сохранить файл</span>
      </button>
    </>
  );
};
