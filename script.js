const reviews = [
    { name: 'Amar M.', rating: 5, text: 'Zahvaljujuci instrukcijama, konacno sam poceo razumijevati ono sto sam ranije samo ucio napamet. Matematiku 1 sam polozio iz prve!', date: 'Student ETF-a · 12.03.2025.', link: '#' },
    { name: 'Lejla K.', rating: 5, text: 'Objasnjenja su jasna, tempo je odlican, a atmosfera opustena. Za mjesec dana sam popravila ocjenu sa 2 na 5.', date: 'Ucenica srednje skole · 28.02.2025.', link: '#' },
    { name: 'Marko P.', rating: 5, text: 'Odlicna priprema za ispit iz Analize. Svaki zadatak smo prosli detaljno i konacno sam stekao sigurnost.', date: 'Student PMF-a · 04.01.2025.', link: '#' }
];

let currentReview = 0;
let reviewTimer;
const $ = (selector) => document.querySelector(selector);

function renderReview(index) {
    const review = reviews[index];
    $('#review-name').textContent = review.name;
    $('#review-date').textContent = review.date;
    $('#review-text').textContent = `“${review.text}”`;
    $('#review-rating').textContent = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    $('#review-rating').setAttribute('aria-label', `Ocjena ${review.rating} od 5`);
    $('#review-link').href = review.link;
    $('#review-avatar').textContent = review.name.split(' ').map((part) => part[0]).join('');
    document.querySelectorAll('.dot').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
}

function changeReview(step) {
    currentReview = (currentReview + step + reviews.length) % reviews.length;
    renderReview(currentReview);
}

function startReviewAutoplay() {
    clearInterval(reviewTimer);
    reviewTimer = setInterval(() => changeReview(1), 6000);
}

reviews.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Recenzija ${index + 1}`);
    dot.addEventListener('click', () => {
        currentReview = index;
        renderReview(index);
        startReviewAutoplay();
    });
    $('#review-dots').append(dot);
});

$('#previous-review').addEventListener('click', () => { changeReview(-1); startReviewAutoplay(); });
$('#next-review').addEventListener('click', () => { changeReview(1); startReviewAutoplay(); });
startReviewAutoplay();

const modal = $('#review-modal');
$('#open-review-modal').addEventListener('click', () => { modal.hidden = false; $('#reviewer-name').focus(); });
document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', () => { modal.hidden = true; }));
$('#review-form').addEventListener('submit', (event) => {
    event.preventDefault();
    $('#review-status').textContent = 'Hvala! Recenzija je spremna za objavu nakon povezivanja backenda.';
    event.target.reset();
});

$('#contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    $('#contact-status').textContent = 'Poruka je validirana. Za stvarno slanje potrebno je povezati backend ili email servis.';
    event.target.reset();
});

const faqAnswers = {
    'koliko kostaju instrukcije': 'Individualni cas je 25 KM, paket od 5 casova 100 KM, a online cas 20 KM.',
    'koliko traje jedan cas': 'Standardni cas traje 60 minuta. Po dogovoru mozemo organizovati i duze termine.',
    'koje razrede poducavate': 'Radimo sa ucenicima osnovne i srednje skole, kao i studentima.',
    'da li nudite online instrukcije': 'Da. Online casovi se odrzavaju putem Zooma ili Google Meeta.',
    'kako mogu rezervisati termin': 'Posalji poruku putem kontakt forme ili pozovi direktno na +387 60 000 000.',
    'gdje se odrzavaju instrukcije': 'Instrukcije su moguce uzivo u Sarajevu ili online, bez obzira na lokaciju.',
    'da li pripremate ucenike za maturu': 'Da, pripremamo ucenike za maturu, testove i prijemne ispite.'
};

function normalizeText(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function addChatMessage(text, type) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    $('#chat-messages').append(message);
    $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight;
}

function answerQuestion(question) {
    const normalized = normalizeText(question);
    const match = Object.keys(faqAnswers).find((key) => normalized.includes(key) || key.split(' ').some((word) => word.length > 4 && normalized.includes(word)));
    addChatMessage(match ? faqAnswers[match] : 'Nisam siguran/na da imam odgovor na to pitanje. Javi se instruktoru putem kontakt forme i rado cemo pomoci.', 'bot');
}

$('#chat-toggle').addEventListener('click', () => {
    const chat = $('#chat-window');
    chat.hidden = !chat.hidden;
    $('#chat-toggle').setAttribute('aria-expanded', String(!chat.hidden));
    if (!chat.hidden) $('#chat-question').focus();
});
$('#chat-close').addEventListener('click', () => { $('#chat-window').hidden = true; $('#chat-toggle').setAttribute('aria-expanded', 'false'); });
document.querySelectorAll('[data-question]').forEach((button) => button.addEventListener('click', () => { addChatMessage(button.dataset.question, 'user'); answerQuestion(button.dataset.question); }));
$('#chat-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('#chat-question');
    const question = input.value.trim();
    if (!question) return;
    addChatMessage(question, 'user');
    answerQuestion(question);
    input.value = '';
});

$('.menu-toggle').addEventListener('click', () => {
    const nav = $('.main-nav');
    nav.classList.toggle('open');
    $('.menu-toggle').setAttribute('aria-expanded', String(nav.classList.contains('open')));
});
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => { $('.main-nav').classList.remove('open'); $('.menu-toggle').setAttribute('aria-expanded', 'false'); }));
