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
let isButtonScroll = false;
let previousScrollPos = 0;

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


// Nerf the fire rate of scroll event
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}



// Check scroll position
function checkScrollPos(e) {
    currentScrollPos = sliderInit.scrollLeft;
    console.log(isButtonScroll);
    if (isButtonScroll) {
        console.log("eerst" + previousScrollPos + "huidige slide" + slideIndex);
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
        console.log("handmatig");
        if (currentScrollPos > previousScrollPos) {
            // Scrolling right
            if (currentScrollPos >= lastscrolledSlidePos - (oneSlideScrollWidth * 3)) { /* een na laatste slide */
                // Move the first slide to the end
                //sliderInit.style.opacity="0";
                sliderInit.classList.add('disable_scroll');
                setTimeout(() => {
                    //sliderInit.scrollLeft -= (oneSlideScrollWidth);
                    sliderInit.appendChild(sliderInit.firstElementChild);
                }, 150);
            }
        } else {
            // Scrolling left
            if (currentScrollPos <= (oneSlideScrollWidth * 3)) {
                // Move the last slide to the beginning
                sliderInit.classList.add('disable_scroll');
                setTimeout(() => {
                    sliderInit.prepend(sliderInit.lastElementChild);
                },150);

            }
        }
        console.log(currentScrollPos + " " + previousScrollPos);
        console.log("end Scroll")
    }
    console.log("daarna" + currentScrollPos + "huidige slide" + slideIndex);
    previousScrollPos = currentScrollPos;
    isButtonScroll = false; // Reset the flag after handling the scroll
    sliderInit.classList.add('disable_scroll');
    setTimeout(() => {
        sliderInit.classList.remove('disable_scroll');
    },250);
}
const debouncedCheckScrollPos = debounce(checkScrollPos, 100);
sliderInit.addEventListener("scroll", debouncedCheckScrollPos);

// Arrows show/hide
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
    setTimeout(() => {
        leftArrow.classList.remove('scrolling');
        sliderInit.classList.remove('scrolling');
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
    setTimeout(() => {
        rightArrow.classList.remove('scrolling');
        sliderInit.classList.remove('scrolling');
    }, 750); // Adjust the timeout duration as needed
});