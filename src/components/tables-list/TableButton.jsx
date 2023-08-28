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
    className="p-2 m-4 border-2 border-transparent rounded-xl select-none text-blue-600
    hover:bg-blue-400/30 shadow-md text-lg  bg-blue-300/30
    dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
    style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent'}}
    > 
    {text}
    </button>
  )
}