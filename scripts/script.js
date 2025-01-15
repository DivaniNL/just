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

// carousel slider vars
let slideIndex = 0;
let sliderScrollPos = 0;
let currentScrollPos;
let lastscrolledSlidePos;
let oneSlideScrollWidth;
let slideCount;

// carousel slider elements
let sliderInit = document.querySelector(".carousel_slides");
let sliderArrowsContainer = document.querySelector(".carousel_arrows");
let sliderArrows = document.querySelectorAll(".carousel_arrow");
let leftArrow = document.querySelector(".arrow_prev_btn");
let rightArrow = document.querySelector(".arrow_next_btn");


// Slider width for calculating scroll position
function declareSlideWidth() {
    slideCount = document.querySelectorAll(".carousel_slide").length;
    let sliderWidth = sliderInit.scrollWidth;
    currentScrollPos = sliderInit.scrollLeft;
    oneSlideScrollWidth = sliderWidth / slideCount;
    lastscrolledSlidePos = sliderWidth - oneSlideScrollWidth;
}

declareSlideWidth();

document.body.onresize = function () {   
    declareSlideWidth();
}

// Nerf the fire rate of scroll event
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Check scroll position
function checkScrollPos() {
    currentScrollPos = sliderInit.scrollLeft;
    arrowDisplay();
}

sliderInit.addEventListener("scroll", debounce(checkScrollPos, 100));
checkScrollPos();

// Arrows show/hide
function arrowDisplay() {
    if (currentScrollPos >= lastscrolledSlidePos) {
        rightArrow.style.display = "none";
    } else {
        rightArrow.style.display = "block";
    }
    if (currentScrollPos <= 0) {
        leftArrow.style.display = "none";
    } else {
        leftArrow.style.display = "block";
    }
}

// left arrow click event
leftArrow.addEventListener("click", () => {

    slideIndex -= 1;
    if (slideIndex < 0) {
        slideIndex = 0;
    }
    sliderScrollPos = currentScrollPos - oneSlideScrollWidth;
    sliderInit.scrollTo({
        left: sliderScrollPos,
        behavior: 'smooth'
    });
    leftArrow.classList.add('scrolling');
    sliderInit.classList.add('scrolling');
    leftArrow.disabled = true;
    setTimeout(() => {
        leftArrow.classList.remove('scrolling');
        sliderInit.classList.remove('scrolling');
        leftArrow.disabled = false;
    }, 750); // Adjust the timeout duration as needed 
});

// right arrow click event
rightArrow.addEventListener("click", () => {
    slideIndex += 1;
    if (slideIndex >= slideCount) {
        slideIndex = slideCount - 1;
    }
    sliderScrollPos = currentScrollPos + oneSlideScrollWidth;
    sliderInit.scrollTo({
        left: sliderScrollPos,
        behavior: 'smooth'
    });
    rightArrow.classList.add('scrolling');
    sliderInit.classList.add('scrolling');
    rightArrow.disabled = true;
    setTimeout(() => {
        rightArrow.classList.remove('scrolling');
        sliderInit.classList.remove('scrolling');
        rightArrow.disabled = false
    }, 750); // Adjust the timeout duration as needed
});