import "../../index.css";
import "./db-table-toolkit-styles.css";
import DTKSQLInput from "./dtk-sql-input";

export default function DbTableToolkit() {
  return (
    <div className="w-full lg:w-fit h-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-800 dark:to-blue-800 rounded-xl shadow-lg p-4">
      <div className="flex flex-col">
        <DTKSQLInput/>
      </div>
    </div>
  );
}
