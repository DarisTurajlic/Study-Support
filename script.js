document.querySelectorAll('.review-image').forEach((image) => {
    image.addEventListener('load', () => {
        const card = image.closest('.review-placeholder');
        card.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
        card.classList.remove('is-empty');
    });
    image.addEventListener('error', () => {
        image.hidden = true;
    });
});

const reviewCards = document.querySelectorAll('.review-placeholder');
const reviewCount = document.querySelector('.review-count');
const reviewFilters = document.querySelectorAll('.review-filter');
let activeReviewYear = 'all';
let reviewIndex = 0;

function showReview(index) {
    const visibleCards = [...reviewCards].filter((card) => activeReviewYear === 'all' || card.dataset.reviewYear === 'all' || card.dataset.reviewYear === activeReviewYear);
    reviewIndex = (index + visibleCards.length) % visibleCards.length;
    reviewCards.forEach((card) => card.classList.toggle('review-current', card === visibleCards[reviewIndex]));
    reviewCount.textContent = `${reviewIndex + 1} / ${visibleCards.length}`;
}

reviewFilters.forEach((button) => button.addEventListener('click', () => {
    activeReviewYear = button.dataset.reviewYear;
    reviewFilters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
    showReview(0);
}));

document.querySelector('#previous-review').addEventListener('click', () => showReview(reviewIndex - 1));
document.querySelector('#next-review').addEventListener('click', () => showReview(reviewIndex + 1));
showReview(0);

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Zatvori navigaciju' : 'Otvori navigaciju');
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Otvori navigaciju');
}));
