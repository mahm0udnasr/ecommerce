const sliderWrapper = document.querySelector('.sliderWrapper');
const slides = document.querySelectorAll('.sliderItem');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

const showSlide = (index) => {
    const slideWidth = slides[0].clientWidth;
    sliderWrapper.style.transform = `translateX(${-index * slideWidth}px)`;
};

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
};

const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
};

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);
setInterval(nextSlide, 3000);


// search
document.getElementById('searchInput').addEventListener('input', function() {
    let filter = this.value;
    let product = document.querySelectorAll('.product');
    for (let i = 0; i < product.length; i++) {
        let title = product[i].querySelectorAll('.productTitle')[0];
        if (title.innerHTML.indexOf(filter) > -1) {
            product[i].style.display = '';
        } else {
            product[i].style.display = 'none';
        }
    }
});

