export const editTheme = (theme) => {
  let htmlElement = document.querySelector('html');
  console.log(theme)
  if (theme) {
    htmlElement.classList.add("dark")
    localStorage.setItem("darkTheme", "true")
  }
  else if (theme===false) {
    htmlElement.classList.remove("dark")
    localStorage.setItem("darkTheme", "false")
  }
}