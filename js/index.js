const header = document.getElementById("header");
const targets = document.querySelectorAll(".target");
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
        // entry.isIntersecting ? entry.target.classList.add('active') : entry.target.classList.remove('active');
    });
}, options);

targets.forEach(el => observer.observe(el));


function changeColor() {
    window.scrollY > 1 ? header.classList.add("scrolled") : header.classList.remove("scrolled"); 
}

window.addEventListener("scroll", changeColor);


const mainTitle = document.querySelector(".animated");

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

if(isElementInViewport(mainTitle)) {
    mainTitle.classList.add("mount");
}

const mainTitleRect = mainTitle.getBoundingClientRect();

const salesYears = document.querySelector(".our_sales > .years .number");

const salesHelped = document.querySelector(".our_sales .helped .number");

function animateSalesYears(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if(!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + "<span>+</span>";
        if (progress  < 1 ) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const salesYearsObj = salesYears;
const salesHelpedObj = salesHelped;
const salesInViewport = salesYearsObj.getBoundingClientRect();

let runOnlyOnce = (function() {
    let executed = false;
    return function() {
        if(!executed) {
            executed = true;

            window.addEventListener("scroll", function(event) {
                if(isElementInViewport(salesYearsObj)) {
                    animateSalesYears(salesYearsObj, 0, 30 ,1000);
                    animateSalesYears(salesHelpedObj, 0, 1000 ,1000);
                };
            }, false);
        }
    };
})();
runOnlyOnce();
runOnlyOnce();