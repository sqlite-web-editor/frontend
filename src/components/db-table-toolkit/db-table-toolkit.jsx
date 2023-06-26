import { useEffect, useState } from "react";
import "../../index.css";
import "./db-table-toolkit-styles.css";
import DTKSQLInput from "./dtk-sql-input";


export default function DbTableToolkit({fileName}) {
  return (
    <div className="lg:w-[36rem] h-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-800 dark:to-blue-800 rounded-xl shadow-lg p-4">
      <div className="flex flex-col space-y-2">
        <DTKSQLInput/>
        <div className="text-lg max-w-[36rem] overflow-hidden text-ellipsis whitespace-nowrap">
          Current file: {fileName ? fileName:""}
        </div>
      </div>
    </div>
  );
}
