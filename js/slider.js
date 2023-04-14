const slides = document.querySelectorAll('.offer__slide'),
    prevArrow = document.querySelector('.offer__slider-prev'),
    nextArrow = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current');
let slideIndex = 1;

showSlideIndex(slideIndex);

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
} else {
    total.textContent = slides.length;
}

function showSlideIndex(n) {
    if (n > slides.length) {
        slideIndex = 1;
    };
    if (n < 1) {
        slideIndex = slides.length;
    };

    slides.forEach((item) => item.style.display = 'none');
    slides[slideIndex - 1].style.display = 'block';

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
};


function changeSlidesIndex(n) {
    showSlideIndex(slideIndex += n);
};

prevArrow.addEventListener('click', () => {
    changeSlidesIndex(-1);
});

nextArrow.addEventListener('click', () => {
    changeSlidesIndex(1);
});


