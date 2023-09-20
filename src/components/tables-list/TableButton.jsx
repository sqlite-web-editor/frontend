import { useId } from "react"

export const TableButton = ({onClick, tableName, text, index}) => {
  const id = useId();
  return (
    <button 
    id={id}
    key={tableName}
    onClick={()=> {
      onClick(document.getElementById(id), index)
    }}
    className="
    p-2 my-4 w-full border-2 border-transparent rounded-xl select-none text-blue-800 bg-blue-200 shadow-md hover:shadow-lg transition-shadow hover:bg-blue-300 dark:hover:bg-blue-700 text-lg dark:bg-blue-800 dark:text-blue-200"
    style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent'}}
    > 
    {text}
    </button>
  )
}