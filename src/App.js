import './App.css';
import "./index.css";
import DbTableTookit from './components/db-table-toolkit/db-table-toolkit';
import FetchDbWindow from './components/fetch-db-window/fetch-db-window';


function App() {
  return (
    <div className='w-full h-full'>
      <div className='flex flex-col pt-4 lg:pt-12 justify-center items-center space-y-12'>
        <div className='w-full lg:w-fit'>
          <div className='flex flex-col lg:flex-row w-full justify-center space-y-4 lg:space-y-0 lg:space-x-4'>
            <FetchDbWindow/>
            <div className='w-full'>
              <DbTableTookit/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
