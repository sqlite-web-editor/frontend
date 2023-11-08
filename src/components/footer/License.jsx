import "./license.css";


function License() {
  return (
    <>
      <span className="space-x-1 flex flex-row">
        <span className="text-white dark:text-gray-200 ">Лицензия:</span> <a className="underline text-blue-700 dark:text-blue-700-glowing" href="https://github.com/sqlite-web-editor/backend/blob/main/LICENSE.txt" target="_blank">MIT</a>
      </span>
    </>
  );
}

export default License;