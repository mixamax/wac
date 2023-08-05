"use strict";

//*************************************************************************************************
const world = document.querySelector(".world");
const after = document.querySelector(".after");
const covid = document.querySelector(".covid");
const textInner2 = document.querySelector(".text-inner2");
const textInner = document.querySelector(".text-inner");

//*************************************************************************************************
let showAll;
let smallScale = 100;
let bigScale = 100;
let startNumberRGB = 0;
let endNumberRGB = 0;

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
};
let isIntersect;
const callback = function (entries, observer) {
    entries.forEach((entry) => {
        isIntersect = entry.isIntersecting;
    });
    if (isIntersect) {
        bigScale = 2000;
        showAll = true;
        startNumberRGB = 0;
        endNumberRGB = 0.4;
        setTimeout(() => {
            window.cancelAnimationFrame(raf);
        }, 3000);
    }
    if (!isIntersect) {
        smallScale = 100;
        showAll = false;
        // startNumberRGB = 0;
        endNumberRGB = 0;
        raf = requestAnimationFrame(callBackRaf);
    }
};

const observer = new IntersectionObserver(callback, options);
const target = document.querySelector(".text");
observer.observe(target);

//*************************************************************************************************

document.querySelector(".field").addEventListener("mousemove", handler2);
let X1 = 500;
let Y1 = 200;
let raf;
let x = 500;
let y = 200;
let scrollY = 0;
let scr_y = 0;

function handler2(e) {
    X1 = e.clientX;
    Y1 = e.clientY;
}

document.addEventListener("scroll", handlerOfScroll);

function handlerOfScroll() {
    scrollY = window.scrollY;
}

function callBackRaf() {
    let sY = lerp(scr_y, scrollY, 0.05);
    scr_y = sY;
    world.style.transform = `translateY(-${sY}px)`;
    after.style.transform = `translateY(-${sY}px)`;
    covid.style.transform = `translateY(-${sY}px)`;
    textInner2.style.transform = `translateY(-${sY * 0.8}px)`;
    textInner.style.transform = `translateY(-${sY * 0.5}px)`;

    let xR = lerp(x, X1, 0.05);
    let yR = lerp(y, Y1, 0.05);
    let V = X1 - x;

    let scale, numberRGB;
    x = xR;
    y = yR;

    if (showAll) {
        scale = lerp(smallScale, 2500, 0.007);
        smallScale = scale;
        numberRGB = lerp(startNumberRGB, endNumberRGB, 0.05);
        startNumberRGB = numberRGB;
    }

    if (!showAll) {
        scale = lerp(bigScale, 100, 0.04);
        bigScale = scale;
        numberRGB = lerp(startNumberRGB, endNumberRGB, 0.03);
        startNumberRGB = numberRGB;
    }
    let changeScale = scale + Math.abs(V) * 0.2;
    const cls = `radial-gradient(circle ${changeScale}px at ${xR}px ${yR}px, transparent ${changeScale}px, #121213 0)`;
    document.querySelector(".fon").style.backgroundImage = cls;
    document.querySelector(
        ".overlay "
    ).style.background = `rgba(0, 0, 0, ${numberRGB})`;

    raf = requestAnimationFrame(callBackRaf);
}

raf = requestAnimationFrame(callBackRaf);

//amt — сумма интерполяции между двумя (от 0,0 до 1,0)
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

//*************************************************************************************************
const optionsNumber = {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
};

const num = document.querySelector(".num");

let count = 0;
let limit = 20;
let isIntersectNumber;
function nn(entries, observer) {
    entries.forEach((entry) => {
        isIntersectNumber = entry.isIntersecting;
    });
    if (isIntersectNumber) {
        console.log("message");
        requestAnimationFrame(callBackRafNumber);

        observerNumber.disconnect();
    }
}

const observerNumber = new IntersectionObserver(nn, optionsNumber);
const targetNumber = num;
observerNumber.observe(targetNumber);

function callBackRafNumber() {
    if (count < limit) {
        num.textContent = count + 1;
        count++;
        requestAnimationFrame(callBackRafNumber);
    }
}
