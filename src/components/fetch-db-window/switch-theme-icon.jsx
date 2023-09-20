import { useEffect } from "react";
import { editTheme } from "./utils";

function SwitchThemeIcon({onClick, theme}) {
  useEffect(()=>{
    editTheme(theme)
  }, [theme])
  return (
    <button className="shadow-md hover:shadow-lg transition-shadow hover:bg-blue-300 dark:hover:bg-blue-700 bg-blue-200 dark:bg-blue-800 border-2 border-transparent rounded-xl p-2"
    onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        className="stroke-2 stroke-blue-800 dark:stroke-blue-200 dark:fill-yellow-500/95 w-6 h-6"/>
      </svg>
    </button>
  );
}

export default SwitchThemeIcon;