import PlayIcon from "./play-icon";
import TrashIcon from "./trash-icon";
import "../../index.css";

function DTKSQLInput() {
  return (
    <div className="flex flex-row items-center space-x-1 justify-center">
      <TrashIcon className="w-6 hover:-skew-x-12"/>
      <input placeholder="SQL query here..." type="text" className="overflow-scroll bg-1 rounded-xl p-2 h-8 w-full shadow-md">
      </input>
      <PlayIcon className="w-6  hover:-skew-y-12"/>
    </div>
  );
}

export default DTKSQLInput;