/**
 * Konfigurasi Global Aplikasi
 * Berisi variabel-variabel yang sering digunakan atau diubah
 */
const CONFIG = {
  // Ganti dengan nomor WhatsApp aktif Anda, format tanpa '+' dan '0' di depan
  whatsapp: "6285129927468", 
  brandName: "Aksara Undangan",
};

/**
 * Event Listener Utama
 * Menunggu hingga seluruh dokumen HTML selesai dimuat sebelum menjalankan script
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Update tahun pada footer secara otomatis
    updateFooterYear();
    
    // (Panggilan fungsi dari file JS lain akan ditambahkan di sini pada tahap selanjutnya)
});

/**
 * Fungsi untuk mengupdate tahun pada bagian copyright footer
 */
function updateFooterYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
  // Update tahun otomatis di footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});