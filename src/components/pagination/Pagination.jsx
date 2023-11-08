import React, { useEffect, useState } from "react";
import SelectRange from "./SelectRange";
import { toastError } from "../../utils/toast-error";

const NUMBERS_FOR_SIDE = 1;

function roundPageCount(number) {
  const rounded = Math.round(number);
  if (number - rounded > 0) {
    return rounded + 1;
  }

  return rounded;
}

const GoToPage = ({ setPage, pageCount }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    if (value > pageCount) {
      setInputValue(pageCount);
      return;
    }
    setInputValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputValue, 10);

    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pageCount) {
      setPage(pageNumber);
      setInputValue("");
    } else {
      toastError("Пожалуйста, введите допустимое число страницы.");
    }
  };

  return (
    <div className="flex items-center space-x-2 justify-center bg-gray-100 dark:bg-gray-800 rounded-full shadow-lg p-4">
      <input
        className="rounded-full p-2 w-32 h-[44px] placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 dark:text-gray-100 bg-gray-300 dark:bg-gray-700"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Страница"
      />
      <button className="stdbutton w-full" onClick={handleGoToPage}>
        Перейти
      </button>
    </div>
  );
};

const PaginationElement = (i, onPageChange, currentPage) => {
  return (
    <li
      key={i}
      className={`${
        currentPage === i
          ? "shadow-lg hover:bg-blue-300 dark:hover:bg-blue-700 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
          : "bg-gray-200 hover:bg-gray-300 text-gray-950 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
      } cursor-pointer list-none py-2 px-6 text-ellipsis flex items-center justify-center rounded-full select-none`}
      onClick={() => onPageChange(i)}
      style={{
        WebkitTapHighlightColor: "transparent",
        tapHighlightColor: "transparent",
      }}
    >
      {currentPage === i ? <b>{i}</b> : <span>{i}</span>}
    </li>
  );
};

const PaginationLine = ({ pageCount, currentPage, onPageChange }) => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    if (pageCount < NUMBERS_FOR_SIDE * 2 + 1) {
      let buf = [];
      for (let i = 1; i <= pageCount; i++) {
        buf.push(i);
      }

      // if (!buf.includes(pageCount)) {
      //   buf.push(pageCount);
      // }

      setPages(buf);
    } else {
      let buf = [];

      for (
        let i = currentPage - NUMBERS_FOR_SIDE;
        (i < currentPage && i > 0) || i === 1;
        i++
      ) {
        if (i !== 0) {
          buf.push(i);
        }
      }

      buf.push(currentPage);

      for (
        let i = currentPage + 1;
        i <= currentPage + NUMBERS_FOR_SIDE && i <= pageCount;
        i++
      ) {
        buf.push(i);
      }

      // if (!buf.includes(1)) {
      //   buf = [1].concat(buf);
      // }

      // if (!buf.includes(pageCount) && pageCount) {
      //   buf.push(pageCount);
      // }

      setPages(buf);
    }
  }, [pageCount, currentPage]);

  return (
    <div className="flex flex-wrap items-center justify-center space-x-1">
      {pages.map((i) => PaginationElement(i, onPageChange, currentPage))}
    </div>
  );
};

function Pagination({
  updateData,
  rowCount,
  currentTable,
  rowsPerRequest,
  setRowsPerRequest,
}) {
  // rowCount - всего строк в таблице
  const [oldRPR, setOldRPR] = useState(rowsPerRequest);
  const [page, setPage] = useState(1);
  const [firstInit, setFirstInit] = useState(true);
  const [pageCount, setPagesCount] = useState(undefined);

  useEffect(() => {
    setPagesCount(roundPageCount(rowCount / rowsPerRequest));
  }, [rowCount]);

  useEffect(() => {
    if (page == 1 && !firstInit) {
      updateData((page - 1) * rowsPerRequest, rowsPerRequest);
    } else setPage(1);
    setPagesCount(roundPageCount(rowCount / rowsPerRequest));
  }, [rowsPerRequest]);

  useEffect(() => {
    !firstInit && updateData((page - 1) * rowsPerRequest, rowsPerRequest);
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [currentTable]);

  useEffect(() => setFirstInit(false), []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-full flex-col h-full items-center justify-center space-y-4">
      <div className="md:flex items-center justify-center md:space-x-2 space-y-4 md:space-y-0">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full shadow-lg p-4">
          <PaginationLine
            pageCount={pageCount}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
        <GoToPage setPage={setPage} pageCount={pageCount} />
      </div>
      <div className="w-full flex items-center justify-center">
        <SelectRange
          setRowsPerRequest={setRowsPerRequest}
          rowsPerRequest={rowsPerRequest}
          setOldRPR={setOldRPR}
        />
      </div>
    </div>
  );
}

export default Pagination;
