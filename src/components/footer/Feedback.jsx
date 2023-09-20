import "./license.css";


function Feedback() {
  return (
    <>
      <span className="text-white dark:text-gray-200 flex flex-col space-y-1 justify-center items-center">
        Нашли ошибку? Напишите мне:<br/> 
        <a href="mailto:boolmano.bugreport@gmail.com?subject=%D0%9F%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B8%D0%BA%D0%BB%D0%B0%20%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%3A%20...%0A%0A%D0%9F%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0%20%D0%B7%D0%B0%D0%BA%D0%BB%D1%8E%D1%87%D0%B0%D0%B5%D1%82%D1%81%D1%8F%20%D0%B2%3A%20...%0A%0A%D0%A5%D0%B0%D1%80%D0%B0%D0%BA%D1%82%D0%B5%D1%80%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%B8%20%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0%2C%20%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F%20%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0%2C%20%D1%85%D0%B0%D1%80%D0%B0%D0%BA%D1%82%D0%B5%D1%80%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%B8%20%D0%BC%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B0%2F%D0%B4%D0%B8%D1%81%D0%BF%D0%BB%D0%B5%D1%8F%3A%20..."
        style={{ WebkitTapHighlightColor: 'transparent', tapHighlightColor: 'transparent' }}
        className="text-blue-300 shadow-md hover:shadow-lg hover:bg-blue-300/30 dark:hover:bg-blue-700/30 transition-shadow bg-blue-300/20 dark:text-blue-700 dark:bg-blue-700/20 rounded-full dark:text-blue-800-glowing-small p-2">
          boolmano.bugreport@gmail.com
        </a>
      </span>
    </>
  );
}

export default Feedback;