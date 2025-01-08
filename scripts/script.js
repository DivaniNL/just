const selectMode = document.querySelector(".theme-selector");
const fetchMode = () => {
    const savedMode = localStorage.getItem("mode");
    selectMode.value = savedMode;
    if (!savedMode) {
        setTheme("light");
    }
};

// Set theme and save to localStorage
const setTheme = (theme) => {
  localStorage.setItem("mode", theme);
};
selectMode.addEventListener("change", (e) => {
    setTheme(e.target.value);
});
fetchMode();