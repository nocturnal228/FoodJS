// first

const slider = document.querySelector('.offer__slider'),
    slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
    slides = slidesWrapper.querySelectorAll('.offer__slide'),
    prevArrow = slider.querySelector('.offer__slider-prev'),
    nextArrow = slider.querySelector('.offer__slider-next'),
    total = slider.querySelector('#total'),
    current = slider.querySelector('#current'),
    slidesInner = slidesWrapper.querySelector('.offer__slider-inner'),
    findWidth = window.getComputedStyle(slidesWrapper).width;
let slideIndex = 1;
let offset = 0;

findOutSlideIndex();

slidesInner.style.width = 100 * slides.length + "%";
slidesInner.style.cssText += 'display: flex; transition: 0.1s all;';
slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = findWidth;
});

slider.style.position = 'relative';
const sliderIndicators = document.createElement('ol'),
    dots = [];
sliderIndicators.classList.add('carousel-indicators');
slider.append(sliderIndicators);

function findOutSlideIndex() {
    if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`
    } else {
        current.textContent = slideIndex
    };
}

function dotsCreate() {
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        for (let j = 0; j < slides.length; j++) {
            dot.classList.add('dot');
        };
        if (i == 0) {
            dot.classList.add('dot-active');
        };
        sliderIndicators.append(dot);
        dots.push(dot);
    };
}

function dotsOpacity() {
    dots.forEach(item => {
        item.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = '1';
}

dotsCreate();

nextArrow.addEventListener('click', () => {
    if (offset == (+findWidth.slice(0, findWidth.length - 2) * (slides.length - 1))) {
        offset = 0;
    } else {
        offset += +findWidth.slice(0, findWidth.length - 2);
    };

    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    };
    findOutSlideIndex();
    dotsOpacity()
});

prevArrow.addEventListener('click', () => {
    if (offset == 0) {
        offset = +findWidth.slice(0, findWidth.length - 2) * (slides.length - 1);
    } else {
        offset -= +findWidth.slice(0, findWidth.length - 2);
    };

    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--
    };
    findOutSlideIndex();
    dotsOpacity()
});

function dotsEventListener() {
    dots.forEach(item => {
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +findWidth.slice(0, findWidth.length - 2) * (slideTo - 1);

            slidesInner.style.transform = `translateX(-${offset}px)`;
            findOutSlideIndex();
            dotsOpacity();
        });
    });
};

dotsEventListener();
// НЕ КАРУСЕЛЬНЫЙ ВАРИАНТ СЛАЙДЕРА

// showSlideIndex(slideIndex);

// if (slides.length < 10) {
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }

// function showSlideIndex(n) {
//     if (n > slides.length) {
//         slideIndex = 1;
//     };
//     if (n < 1) {
//         slideIndex = slides.length;
//     };

//     slides.forEach((item) => item.style.display = 'none');
//     slides[slideIndex - 1].style.display = 'block';

//     if (slides.length < 10) {
//         current.textContent = `0${slideIndex}`;
//     } else {
//         current.textContent = slideIndex;
//     }
// };


// function changeSlidesIndex(n) {
//     showSlideIndex(slideIndex += n);
// };

// prevArrow.addEventListener('click', () => {
//     changeSlidesIndex(-1);
// });

// nextArrow.addEventListener('click', () => {
//     changeSlidesIndex(1);
// });







