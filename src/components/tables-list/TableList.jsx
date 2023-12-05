import "../../index.css";
import "./TableButton.css"
import { useState } from "react";
import { TableButton } from "./TableButton";


export const TableList = ({tablesArray, setCurrentTable}) => {
  const [tableHTMLElement, setTableHTMLElement] = useState(undefined);
  return (
    <div className="bg-1 rounded-xl shadow-lg w-full overflow-auto overflow-style dark:dark-overflow-style">
      <div className="flex items-center justify-between space-x-4">
        {tablesArray.map((tableName,) => {
          return (
            <TableButton key={tableName} tableName={tableName} 
            onClick={(selfHTMLElement=> 
              {
                if (selfHTMLElement===tableHTMLElement) {
                  tableHTMLElement.classList.remove("table-button-active");
                  setCurrentTable(undefined);
                  setTableHTMLElement(undefined);
                  return;
                }
                setCurrentTable(tableName);
                selfHTMLElement.classList.add("table-button-active");
                if (tableHTMLElement!=undefined) {
                  tableHTMLElement.classList.remove("table-button-active");
                }
                setTableHTMLElement(selfHTMLElement);
              })}
            text={tableName}/>
          )
        })}
      </div>
  </div>
  )
}