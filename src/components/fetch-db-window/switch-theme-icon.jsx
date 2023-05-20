function SwitchThemeIcon() {
  const handleClick = () => {
    let htmlElement = document.querySelector('html');
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark")
    }
    else {
      htmlElement.classList.add("dark")
    }
  }
  return (
    <button className="
    bg-blue-300/30 hover:bg-blue-400/30 rounded-xl p-1 
    shadow-md hover:skew-x-12
  dark:bg-yellow-800 dark:hover:bg-yellow-700"
    onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className="w-6 h-6  stroke-blue-600 dark:stroke-gray-100 dark:fill-yellow-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    </button>
  );
}

export default SwitchThemeIcon;