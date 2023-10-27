import Feedback from "./Feedback";
import GithubIcon from "./GithubIcon";
import License from "./License";

function Footer() {
  return ( 
    <footer className="w-full h-fit p-8 rounded-t-0 bg-gray-700 dark:bg-black">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col mt-8 space-y-4 md:space-y-0 md:flex-row items-center h-full justify-around">
          <div className="flex flex-col">
            <License/>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <span className="text-white dark:text-gray-200">Исходный код:</span> <GithubIcon/>
          </div>
          <Feedback/>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
