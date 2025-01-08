const selectMode = document.querySelector(".theme-selector");
const fetchMode = () => {
    const savedMode = localStorage.getItem("mode");
    if (!savedMode) {
        setTheme("light");
        console.log("test");
    }else{
        selectMode.value = savedMode;
        setTheme(savedMode);
    }
};

// Set theme and save to localStorage
const setTheme = (theme) => {
  localStorage.setItem("mode", theme);
  document.body.setAttribute("data-theme", theme);
};
selectMode.addEventListener("change", (e) => {
    setTheme(e.target.value);
});
fetchMode();