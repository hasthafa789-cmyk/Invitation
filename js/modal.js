document.addEventListener('DOMContentLoaded', () => {
    initModal();
});

/**
 * Inisialisasi perilaku Modal untuk preview demo undangan
 */
function initModal() {
    const modal = document.getElementById('demoModal');
    const modalFrame = document.getElementById('modalFrame');
    
    // Cari semua tombol penutup modal (bisa berupa tombol X atau area backdrop gelap di luar)
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    
    // Cari semua tombol pemicu demo (berada di dalam template-card)
    // Berdasarkan index.html, tombol ini memiliki atribut data-demo
    const demoButtons = document.querySelectorAll('[data-demo]');

    if (!modal || !modalFrame) return;

    // Fungsi untuk membuka modal dan memuat iframe
    function openModal(demoUrl) {
        // Set sumber iframe ke URL demo
        modalFrame.src = demoUrl;
        
        // Hapus atribut hidden agar modal terlihat
        modal.removeAttribute('hidden');
        modal.setAttribute('aria-hidden', 'false');
        
        // Cegah halaman belakang (body) agar tidak bisa di-scroll
        document.body.style.overflow = 'hidden';
    }

    // Fungsi untuk menutup modal dan mereset iframe
    function closeModal() {
        // Set kembali atribut hidden
        modal.setAttribute('hidden', '');
        modal.setAttribute('aria-hidden', 'true');
        
        // Bersihkan iframe agar tidak terus memutar musik/video jika ada di dalamnya
        modalFrame.src = '';
        
        // Kembalikan kemampuan scroll pada body
        document.body.style.overflow = '';
    }

    // Pasang event listener pada setiap tombol demo
    demoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const demoUrl = btn.getAttribute('data-demo');
            if (demoUrl) {
                openModal(demoUrl);
            }
        });
    });

    // Pasang event listener pada tombol penutup modal (X) dan backdrop
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Opsional: Tutup modal saat tombol Escape di keyboard ditekan
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
            closeModal();
        }
    });
}