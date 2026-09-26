document.querySelectorAll('.review-image').forEach((image) => {
    image.addEventListener('load', () => image.closest('.review-placeholder').classList.remove('is-empty'));
    image.addEventListener('error', () => {
        image.hidden = true;
    });
});

const reviewCards = document.querySelectorAll('.review-placeholder');
const reviewCount = document.querySelector('.review-count');
let reviewIndex = 0;

function showReview(index) {
    reviewIndex = (index + reviewCards.length) % reviewCards.length;
    reviewCards.forEach((card, cardIndex) => card.classList.toggle('review-current', cardIndex === reviewIndex));
    reviewCount.textContent = `${reviewIndex + 1} / ${reviewCards.length}`;
}

document.querySelector('#previous-review').addEventListener('click', () => showReview(reviewIndex - 1));
document.querySelector('#next-review').addEventListener('click', () => showReview(reviewIndex + 1));

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
