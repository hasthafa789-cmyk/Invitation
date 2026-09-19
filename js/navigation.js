document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
});

/**
 * Inisialisasi navigasi (Hamburger menu untuk mobile & perilaku saat scroll)
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const toggleBtn = document.getElementById('navbarToggle');
    const navMenu = document.getElementById('navbarNav');
    
    if (!navbar || !toggleBtn || !navMenu) return;

    // Toggle menu saat tombol hamburger diklik
    toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        
        // Ubah state
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-active');
        toggleBtn.classList.toggle('is-active');
    });

    // Tutup menu mobile ketika salah satu link diklik
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('is-active')) {
                toggleBtn.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-active');
                toggleBtn.classList.remove('is-active');
            }
        });
    });

    // Tambahkan background solid pada navbar saat halaman di-scroll ke bawah
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    });
}

/**
 * Inisialisasi Smooth Scroll untuk link internal yang menggunakan anchor (#)
 */
function initSmoothScroll() {
    // Cari semua link yang menuju ke ID tertentu (dimulai dengan '#')
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Abaikan jika hanya "#" (biasanya digunakan untuk placeholder)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Ambil tinggi navbar untuk offset agar konten tidak tertutup navbar (asumsi navbar fixed)
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                
                // Hitung posisi elemen target
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navbarHeight;
                
                // Lakukan scroll yang mulus
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}