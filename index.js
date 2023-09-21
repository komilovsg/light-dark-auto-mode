const darkThemeClass = "dark-theme";
const lightThemeClass = "light-theme";

const classButtonSelected = "button--selected";

const buttonLight = document.querySelector(".button-light");
const buttonAuto = document.querySelector(".button-auto");
const buttonDark = document.querySelector(".button-dark");

const THEME = {
  DARK: "dark",
  LIGHT: "light",
  AUTO: "auto",
};

const localStorageKey = "theme";

const setTheme = (node) => {
  const localStorage = window.localStorage;

  switch (node) {
    case THEME.DARK: {
      document.body.classList.add(darkThemeClass);
      document.body.classList.remove(lightThemeClass);

      buttonDark.classList.add(classButtonSelected);
      buttonAuto.classList.remove(classButtonSelected);
      buttonLight.classList.remove(classButtonSelected);

      localStorage.setItem(localStorageKey, THEME.DARK);

      return;
    }
    case THEME.LIGHT: {
      document.body.classList.add(lightThemeClass);
      document.body.classList.remove(darkThemeClass);

      buttonDark.classList.remove(classButtonSelected);
      buttonAuto.classList.remove(classButtonSelected);
      buttonLight.classList.add(classButtonSelected);

      localStorage.setItem(localStorageKey, THEME.LIGHT);

      return;
    }
    case THEME.AUTO:
    default: {
      const isDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDark) {
        document.body.classList.add(darkThemeClass);
        document.body.classList.remove(lightThemeClass);
      } else {
        document.body.classList.add(lightThemeClass);
        document.body.classList.remove(darkThemeClass);
      }

      buttonDark.classList.remove(classButtonSelected);
      buttonAuto.classList.add(classButtonSelected);
      buttonLight.classList.remove(classButtonSelected);

      localStorage.setItem(localStorageKey, THEME.AUTO);

      return;
    }
  }
};

const initTheme = () => {
  const savedThemeValue = localStorage.getItem(localStorageKey);
  setTheme(savedThemeValue);
};

const subscribeOnButtons = () => {
  buttonLight.addEventListener("click", () => setTheme(THEME.LIGHT));
  buttonDark.addEventListener("click", () => setTheme(THEME.DARK));
  buttonAuto.addEventListener("click", () => setTheme(THEME.AUTO));
};

initTheme();
subscribeOnButtons();