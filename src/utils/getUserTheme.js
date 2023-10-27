export function getUserTheme() {
    // true - dark 
    // false - light
    if (window.matchMedia) {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        return true;
      } else {
        return false;
      }
    }
    return false;
  }