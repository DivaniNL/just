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
let allSlides = document.querySelectorAll(".carousel_slide");


// Slider width for calculating scroll position
function declareSlideWidth() {

    slideCount = document.querySelectorAll(".carousel_slide").length;
    let sliderWidth = sliderInit.scrollWidth;
    currentScrollPos = sliderInit.scrollLeft;
    oneSlideScrollWidth = sliderWidth / slideCount;
    lastscrolledSlidePos = sliderWidth - oneSlideScrollWidth;
}

// Fill slides with slide number
function fillSlides(){
    allSlides.forEach((slide,i) => {    
        i++;
        slideInt = i;
        let slideIString = slideInt + "/" + slideCount;
        slide.setAttribute("data-slide", i);
        slideInitContainer = document.createElement("span");
        slideInitContainer.classList.add("text_accent");
        slideInitContainer.textContent = slideIString;

        slideDesc = slide.querySelector(".text_small");
        slideDesc.prepend(slideInitContainer);

    });
    // Add last slide to first
    sliderInit.prepend(sliderInit.lastElementChild);
}


declareSlideWidth();
fillSlides();

document.body.onresize = function () {   
    declareSlideWidth();
}

let isButtonScroll = false;

// Nerf the fire rate of scroll event
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

let previousScrollPos = 0;

// Check scroll position
function checkScrollPos(e) {
    currentScrollPos = sliderInit.scrollLeft;
    arrowDisplay();

    if (isButtonScroll) {
        if (currentScrollPos > previousScrollPos) {
            // Scrolling right
            if (currentScrollPos >= (lastscrolledSlidePos - oneSlideScrollWidth)) {
                // Move the first slide to the end
                sliderInit.appendChild(sliderInit.firstElementChild);
                // sliderInit.scrollLeft -= oneSlideScrollWidth;
            }
        } else {
            // Scrolling left
            if (currentScrollPos <= 2) {
                // Move the last slide to the beginning
                sliderInit.prepend(sliderInit.lastElementChild);
                // sliderInit.scrollLeft += oneSlideScrollWidth;
            }
        }
    }
    else{
        if (currentScrollPos > previousScrollPos) {
            // Scrolling right
            if (currentScrollPos >= (lastscrolledSlidePos - oneSlideScrollWidth)) {
                // Move the first slide to the end
                sliderInit.appendChild(sliderInit.firstElementChild);
                // sliderInit.scrollLeft -= (oneSlideScrollWidth * 1);
            }
        } else {
            // Scrolling left
            if (currentScrollPos <= 2) {
                // Move the last slide to the beginning
                sliderInit.prepend(sliderInit.lastElementChild);
                // sliderInit.scrollLeft += oneSlideScrollWidth;
            }
        }
        console.log(currentScrollPos + " " + previousScrollPos);
    }

    previousScrollPos = currentScrollPos;
    isButtonScroll = false; // Reset the flag after handling the scroll
}
const debouncedCheckScrollPos = debounce(checkScrollPos, 100);
sliderInit.addEventListener("scroll", debouncedCheckScrollPos);

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
    isButtonScroll = true;
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
    isButtonScroll = true;
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
        rightArrow.disabled = false;
    }, 750); // Adjust the timeout duration as needed
});