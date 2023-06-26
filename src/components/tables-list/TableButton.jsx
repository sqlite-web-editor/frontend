

export const TableButton = ({onClick, tableName, text}) => {
  return (
    <button 
    key={tableName}
    onClick={onClick}
    className="p-2 rounded-xl select-none hover:bg-blue-400/30 shadow-md bg-blue-300/30 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
    style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent'}}
    > 
    {text}
    </button>
  )
}