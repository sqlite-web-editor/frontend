import FDFButton from "./fetch-dbfile-button";
import FDWHeader from "./window-header";
import "../../index.css";
import SwitchThemeIcon from "./switch-theme-icon";

function FetchDbWindow() {
  return (
    <div className="bg-1 p-4 rounded-xl h-fit shadow-lg">
      <div className="h-full space-y-8">
        <div className="flex flex-row justify-between items-center space-x-8">
          <FDWHeader/>
          <SwitchThemeIcon/>
        </div>
        <div className="flex justify-center items-center h-full w-full">
          <FDFButton/>
        </div>
      </div>
    </div>
  );
}

export default FetchDbWindow;