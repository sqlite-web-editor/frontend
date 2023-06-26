import "../../index.css";
import { TableButton } from "./TableButton";


export const TableList = ({tablesArray, setCurrentTable}) => {
  return (
    <div className="flex items-center justify-between space-x-4 pb-6 overflow-x-scroll">
      {tablesArray.map((tableName) => {
        return (
          <TableButton tableName={tableName} onClick={()=>setCurrentTable(tableName)} text={tableName}/>
        )
      })}

        </div>
    )
}