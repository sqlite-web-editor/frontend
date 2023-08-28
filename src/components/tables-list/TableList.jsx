import "../../index.css";
import "./TableButton.css"
import { useRef, useState } from "react";
import { TableButton } from "./TableButton";
import { useScrollbar } from "../../hooks";


export const TableList = ({tablesArray, setCurrentTable}) => {
  const [tableHTMLElement, setTableHTMLElement] = useState(undefined);
  const tableListRef = useRef(null);
  useScrollbar(tableListRef, true)
  return (
    <div ref={tableListRef} className="bg-1 rounded-xl shadow-lg w-full">
      <div className="flex items-center justify-between space-p-4">
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