const brandCarousel = document.querySelector(".brand_list");
let carouselWidth = brandCarousel.clientWidth;


scatterBrand();

function scatterBrand() {
    for(let i = 0; i < brandLogo.length; i++) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        brandCarousel.appendChild(li);
        li.classList.add("slide-item");
        li.innerHTML = `<img src ="./imgs/hugebrand/${brandLogo[i].img}">`
    }
}

const eachItem = document.querySelector(".slide-item");
let itemWidth = eachItem.clientWidth;

let carouselItems = document.querySelectorAll(".brand_list li");
const maxCarousel = carouselItems.length;
let currCarousel = 1;

let loopInterval = setInterval(() => {
    nextMove();
},3000);

brandCarousel.addEventListener("mouseover", () => {
    clearInterval(loopInterval);
});

brandCarousel.addEventListener("mouseout", () => {
    loopInterval = setInterval(() => {
        nextMove();
    },3000);
});

const startCarousel = carouselItems[0];
const endCarousel = carouselItems[maxCarousel -1];
const startEl = document.createElement("li");
const endEl = document.createElement("li");

endCarousel.classList.forEach((c) => endEl.classList.add(c));
endEl.innerHTML = endCarousel.innerHTML;

startCarousel.classList.forEach((c) => startEl.classList.add(c));
startEl.innerHTML = startCarousel.innerHTML;

carouselItems[0].before(endEl);
carouselItems[carouselItems.length -1].after(startCarousel);

carouselItems = document.querySelectorAll(".slide-item");
let offset = carouselWidth + currCarousel;
let itemOffset = itemWidth + currCarousel;
carouselItems.forEach((i) => {
    i.setAttribute("style", `left: ${-itemOffset}px`);
});

function nextMove() {
    currCarousel++;

    if(currCarousel < maxCarousel) {
        const offset = carouselWidth * currCarousel;
        const itemOffset = itemWidth * currCarousel;
        carouselItems.forEach((i) => {
            i.setAttribute("style", `left: ${-itemOffset}px`);
        });
    } else {
        currCarousel = 0;
        let offset = carouselWidth * currCarousel;
        let itemOffset = itemWidth * currCarousel;
        carouselItems.forEach((i) => {
            i.setAttribute("style", `transition: ${0}s; left: ${-itemOffset}px`);
        });
        currCarousel++;
        offset = carouselWidth * currCarousel;
        itemOffset = itemWidth * currCarousel;

        setTimeout(() => {
            carouselItems.forEach((i) => {
                i.setAttribute("style", `transition: ${0.15}s; left: ${-itemOffset}px`);
            });
        }, 0);
    }
}

function prevMove() {
    currCarousel--;
    if(currCarousel > 0) {
        const offset = carouselWidth * currCarousel;
        const itemOffset = itemWidth * currCarousel;
        carouselItems.forEach((i) => {
            i.setAttribute("style", `left: ${-itemOffset}px`);
        });
    } else {
        currCarousel= maxCarousel + 1;
        let offset = carouselWidth * currCarousel;
        let itemOffset = itemWidth * currCarousel;
        carouselItems.forEach((i) => {
            i.setAttribute("style", `transition: ${0}s; left: ${-itemWidth}px`);
        });
        
        currCarousel--;
        offset = carouselWidth * currCarousel;
        itemOffset = itemWidth * currCarousel;
        setTimeout(() => {
            carouselItems.forEach((i) => {
                i.setAttribute("style", `transition: ${0.15}s; left: ${-itemOffset}px`);
            });
        }, 0);
    }
}

window.addEventListener("resize", () => {
    carouselWidth = brandCarousel.clientWidth;
});

let startPoint = 0;
let endPoint = 0;

brandCarousel.addEventListener("mousedown", (e) => {
    startPoint = e.pageX;
});

brandCarousel.addEventListener("mouseup", (e) => {
    endPoint = e.pageX;
    if(startPoint < endPoint) {
        prevMove();
    } else if(startPoint > endPoint) {
        nextMove();
    }
});