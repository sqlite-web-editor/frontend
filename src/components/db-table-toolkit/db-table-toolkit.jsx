import { useEffect, useState } from "react";
import "../../index.css";
import "./db-table-toolkit-styles.css";
import DTKSQLInput from "./dtk-sql-input";

export default function DbTableToolkit({ fileName }) {
  useEffect(() => {
    if (fileName) {
      document.title = `${fileName}`;
    }
  }, [fileName]);
  return (
    <div className="lg:w-[24rem] h-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-800 dark:to-blue-800 rounded-xl shadow-lg p-4">
      <div className="flex flex-col space-y-2 justify-between h-full">
        <div className="text-lg max-w-[36rem] overflow-hidden text-ellipsis whitespace-nowrap dark:text-blue-100">
          Текущий файл: {fileName ? fileName : ""}
        </div>
        <a href="/cheatsheet.pdf">
          <div className="p-2 transition-shadow hover:shadow-lg border-2 border-transparent space-x-2 shadow-md flex flex-row  items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-full dark:text-blue-100 text-blue-950 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span>Документация</span>
          </div>
        </a>
      </div>
    </div>
  );
}
