document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
});

/**
 * Inisialisasi perilaku accordion untuk bagian FAQ
 */
function initFAQ() {
    const faqList = document.getElementById('faqList');
    if (!faqList) return;

    const faqItems = faqList.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-item__question');
        
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';
                
                // Opsional: Jika ingin gaya accordion klasik (hanya satu jawaban terbuka sekaligus),
                // uncomment blok kode di bawah ini:
                /*
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
                        otherItem.classList.remove('is-open');
                    }
                });
                */

                // Toggle status untuk item yang diklik
                if (isExpanded) {
                    questionBtn.setAttribute('aria-expanded', 'false');
                    item.classList.remove('is-open');
                } else {
                    questionBtn.setAttribute('aria-expanded', 'true');
                    item.classList.add('is-open');
                }
            });
        }
    });
}