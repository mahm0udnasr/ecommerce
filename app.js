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

window.addEventListener("scroll", ()=> {
    const stickyNav = document.querySelector("nav");
    stickyNav.classList.toggle("sticky", window.scrollY > 0);
})

const openCart = document.getElementById('openCart');
const shopCart = document.getElementById("shopCart");

openCart.onclick = ()=> {
    if (shopCart.style.display == 'none') {
        shopCart.style.display = 'block';
    } else {
        shopCart.style.display = 'none';
    }
}

/**
    *Shopping Cart
        * get data from proudct 
        * send data for localstorage 
        * show data in shopping cart 
        * on click delete icon  - delete the product from local storage
        * get sum in totalPrice text
 */


const addToCartButtons = document.querySelectorAll('.addCart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});
loadCart();


function addToCart(event) {
    const productDiv = event.target.parentElement;
    console.log(productDiv);
    const productName = productDiv.querySelector('.productTitle').textContent;
    const productPrice = parseFloat(productDiv.querySelector('.productPrice').textContent);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function loadCart() {
    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedCart = document.getElementById('savedCart')
    savedCart.innerHTML = '';
    let totalPrice = 0;
    cart.forEach((item, index) => {
        let ProudctDetails = `
            <div class="saveCart">
                <div class="savepImg">
                    <img class="productImg" loading="lazy" alt="Nike Air Max" width="60" height="60" src="https://via.placeholder.com/60">
                </div>
                <div class="savepDetails">
                    <div class="saveTitle">${item.name}</div>
                    <div class="savePrice">$${item.price}</div>
                </div>
                <div class="saveDeleted" id="deleteProduct" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `;
        savedCart.innerHTML += ProudctDetails
        totalPrice += item.price;
    });
    document.querySelector(".total").textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}