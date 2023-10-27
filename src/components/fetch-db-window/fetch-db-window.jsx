import FDFButton from "./fetch-dbfile-button";
import FDWHeader from "./window-header";
import "../../index.css";
import SwitchThemeIcon from "./switch-theme-icon";
import { FetchDbFileFromServer } from "./fetch-dfile-from-server";

function FetchDbWindow({onFileUpload, theme, setTheme}) {
  const handleChangeThemeClick = () => {
    setTheme(!(theme))
  }
  return (
    <div className="bg-1 rounded-b-xl lg:rounded-xl h-fit shadow-lg">
      <div className="h-full w-full space-y-4 p-4">
        <div className="flex justify-center items-center w-full space-x-2">
        <FDWHeader/>
        <SwitchThemeIcon onClick={handleChangeThemeClick} theme={theme}/>
        </div>
        <div className="flex justify-center items-center h-full w-full space-x-2">
          <FDFButton onFileUpload={onFileUpload}/>
          <FetchDbFileFromServer/>
        </div>
      </div>
    </div>
  );
}

export default FetchDbWindow;