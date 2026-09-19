document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppLinks();
});

/**
 * Inisialisasi tombol-tombol pemesanan WhatsApp
 * Menggunakan nomor dari objek CONFIG di main.js
 */
function initWhatsAppLinks() {
    // Pastikan CONFIG tersedia (dari main.js)
    if (typeof CONFIG === 'undefined' || !CONFIG.whatsapp) {
        console.error('Konfigurasi WhatsApp tidak ditemukan. Pastikan js/main.js dimuat sebelum js/whatsapp.js');
        return;
    }

    const waNumber = CONFIG.whatsapp;
    
    // 1. Tangani tombol WhatsApp umum (seperti di Hero atau CTA bawah)
    const heroBtn = document.getElementById('heroWhatsappBtn');
    const ctaBtn = document.getElementById('ctaWhatsappBtn');
    
    const generalMessage = encodeURIComponent(`Halo ${CONFIG.brandName || 'Admin'}, saya tertarik untuk memesan undangan digital. Mohon informasi lebih lanjut terkait cara pemesanan dan paket yang tersedia.`);
    const generalWaUrl = `https://wa.me/${waNumber}?text=${generalMessage}`;

    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            // Jika href tidak mengarah ke hash (#) atau URL lain, biarkan perilaku default
            if(heroBtn.getAttribute('href') === '#kontak') {
                 e.preventDefault();
                 window.open(generalWaUrl, '_blank', 'noopener,noreferrer');
            }
        });
    }

    if (ctaBtn) {
       ctaBtn.addEventListener('click', (e) => {
            if(ctaBtn.getAttribute('href') === '#kontak') {
                 e.preventDefault();
                 window.open(generalWaUrl, '_blank', 'noopener,noreferrer');
            }
       });
    }


    // 2. Tangani tombol pesan dari Kartu Harga (Paket Basic, Premium, Exclusive)
    const pricingBtns = document.querySelectorAll('.pricing-card__cta');
    
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ambil data paket dan harga dari atribut HTML
            const packageName = btn.getAttribute('data-package') || 'Paket';
            const packagePrice = btn.getAttribute('data-price') || '';
            
            let message = `Halo ${CONFIG.brandName || 'Admin'}, saya tertarik untuk memesan undangan digital dengan paket:\n\n`;
            message += `*Paket:* ${packageName}\n`;
            if (packagePrice) {
                message += `*Harga:* ${packagePrice}\n\n`;
            }
            message += `Mohon panduannya untuk langkah selanjutnya.`;
            
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            
            // Buka tab baru ke WhatsApp
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    });

    // 3. Tangani tombol "Pilih Template" dari dalam Katalog (Event Delegation)
    document.body.addEventListener('click', (e) => {
        const orderBtn = e.target.closest('.js-btn-order');
        if (orderBtn) {
            e.preventDefault();
            const templateName = orderBtn.getAttribute('data-template') || 'Template';
            
            let message = `Halo ${CONFIG.brandName || 'Admin'}, saya tertarik untuk memesan undangan digital.\n\n`;
            message += `Saya ingin menggunakan desain *${templateName}*.\n\n`;
            message += `Mohon info cara pemesanan selanjutnya.`;
            
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
    });
}