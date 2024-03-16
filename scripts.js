// banner slider vars
let banner_images = null
let banner_messages = null
let banner_current_index = 0
let banner_last_index = 0


// card slidervars
let cards = null
let card_links = null
let card_last_index = null
let card_first_index = null
let card_last_step_size = null
let card_slider_next_btn = null
let card_slider_prev_btn = null

// menu toggler
let menu_button = null
let dropdown_menu = null


/////////////////////////////////////////////////////////////////////////////////////////////
// banner slider functions
/////////////////////////////////////////////////////////////////////////////////////////////
function nextBannerSlide() {
    // update indices
    if (banner_current_index < banner_images.length - 1) {
        banner_last_index = banner_current_index;
        banner_current_index++
    } else {
        banner_last_index = banner_current_index;
        banner_current_index = 0;
    }

    // hide all except last or outgoing image
    banner_images.forEach((image, i) => {
        if (i !== banner_last_index) {
            if (image.classList.contains("show")) {
                image.classList.remove("show")
            }
            image.classList.add("hide")
        }
    })

    // remove "incoming" class on the outgoing image, but keep "show"
    if (banner_images[banner_last_index].classList.contains("incoming")) {
        banner_images[banner_last_index].classList.remove("incoming")
    }

    // unhide the new slide and apply incoming class
    banner_images[banner_current_index].classList.remove("hide")
    banner_images[banner_current_index].classList.add("incoming")
    banner_images[banner_current_index].classList.add("show")

    // show relevant banner message
    // hide all messages first
    banner_messages.forEach(message => {
        if (message.classList.contains("show")) {
            message.classList.remove("show")
        }
    })
    // show message
    banner_messages[banner_current_index].classList.add("show")
}

function initBannerSlider() {

    // hide all images
    banner_images.forEach((image) => {
        image.classList.add("hide")
    })

    // show first image
    banner_images[banner_current_index].classList.remove("hide")
    banner_images[banner_current_index].classList.add("incoming")
    banner_images[banner_current_index].classList.add("show")

    // show current message
    banner_messages[banner_current_index].classList.add("show")

    setInterval(function () {
        nextBannerSlide()
    }, 6000)
}

/////////////////////////////////////////////////////////////////////////////////////////////
// card slider functions
/////////////////////////////////////////////////////////////////////////////////////////////

function sliderNextGroup() {
    //check if screen size changed
    checkStepSize();
    //slide over to next group of slides
    if ((card_last_index + getStepSize()) <= cards.length - 1) {
        // move by whole group size if elements are available
        card_last_index += getStepSize()
    } else {
        // else just move to last element
        card_last_index = cards.length - 1;
    }

    // set first index
    card_first_index = card_last_index - (getStepSize() - 1);

    // console.log(`Going to last index: ${card_last_index}`)
    card_links[card_last_index].click()
    setButtonStates()
}

function sliderPrevGroup() {
    //check if screen size changed
    checkStepSize();
    //slide back to prev group of slides
    if ((card_first_index - getStepSize()) >= 0) {
        // move by whole group size if elements available
        card_first_index -= getStepSize()
    } else {
        //else just move to first element
        card_first_index = 0
    }

    // set last index
    card_last_index = card_first_index + (getStepSize() - 1)

    // console.log(`Going to index: ${card_first_index}`)
    card_links[card_first_index].click()
    setButtonStates()
}

function setButtonStates() {

    // console.log("setting button states")
    if (card_last_index >= cards.length - 1) {
        //there no more items in forward direction
        // console.log("disable next button")
        card_slider_next_btn.classList.add("disabled")
    } else {
        card_slider_next_btn.classList.remove("disabled")
    }

    if (card_first_index <= 0) {
        //there no more items in backward direction
        // console.log("disable prev button")
        card_slider_prev_btn.classList.add("disabled");
    } else {
        card_slider_prev_btn.classList.remove("disabled");
    }

}

//step size equals the number of items in view which depends on flex basis
//this allows responsive design, changing flex basis on diferent screens
function getStepSize() {
    let computedStyle = window.getComputedStyle(cards[0]);
    flex_basis = computedStyle.getPropertyValue('flex-basis');
    //we use percentages for flex basis therefore 100% / *% = number of items
    return 100 / parseInt(flex_basis);
}

function checkStepSize() {
    // if screen size changes we have to reinitialize
    if (card_last_step_size !== getStepSize()) {
        card_slider_initialize()
    }
}

function card_slider_initialize() {
    //start at position 0
    card_first_index = 0;
    // card_links[card_first_index].click();
    //index of last displayed item
    card_last_index = getStepSize() - 1;
    //set last step size
    card_last_step_size = getStepSize();

    setButtonStates();
}

/////////////////////////////////////////////////////////////////////////////////////////////
// menu toggler
/////////////////////////////////////////////////////////////////////////////////////////////

function toggleMenu() {
    dropdown_menu.classList.toggle("show")
}

/////////////////////////////////////////////////////////////////////////////////////////////
// loadJS
/////////////////////////////////////////////////////////////////////////////////////////////

window.onload = function () {

    // console.log("Loaded JScript");

    // initialize banner slide
    banner_images = document.querySelectorAll(".banner-wrapper > img");
    banner_messages = document.querySelectorAll(".banner-message")
    initBannerSlider();

    // initialize card slider
    cards = document.querySelectorAll(".card-flex-container");
    card_links = document.querySelectorAll(".card-slider-link");
    card_slider_next_btn = document.getElementById("card-slider-next");
    card_slider_prev_btn = document.getElementById("card-slider-prev");

    // console.log(`next btn: ${card_slider_next_btn}`)
    // console.log(`prev btn: ${card_slider_prev_btn}`)

    card_slider_initialize()

    // initialize menu button
    menu_button = document.querySelector(".menu-icon i");
    dropdown_menu = document.querySelector(".dropdown-menu");

    // console.log(menu_button);
    // console.log(dropdown_menu);
}
