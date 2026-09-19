document.addEventListener('DOMContentLoaded', () => {
  // 1. Data Dummy Template
  // Anda bisa menambah, mengubah, atau menghapus data ini nantinya
  const templates = [
    { id: 1, name: 'Elegant Gold', category: 'elegant', image: 'assets/images/demo-elegant-gold.jpg', url: 'demo/template-01/' },
    { id: 2, name: 'Ivory Simple', category: 'minimalis', image: 'assets/images/demo-ivory-simple.jpg', url: 'demo/template-02/' },
    { id: 3, name: 'Nur Walimah', category: 'islami', image: 'assets/images/demo-nur-walimah.jpg', url: 'demo/template-03/' },
    { id: 4, name: 'Rustic Bloom', category: 'floral', image: 'assets/images/demo-rustic.jpg', url: 'demo/template-04/' },
    { id: 5, name: 'Batik Classic', category: 'tradisional', image: 'assets/images/demo-batik.jpg', url: 'demo/template-05/' },
    { id: 6, name: 'Modern Dark', category: 'modern', image: 'assets/images/demo-dark.jpg', url: 'demo/template-06/' }
  ];

  const templateGrid = document.getElementById('templateGrid');
  const emptyMessage = document.getElementById('templateEmpty');
  const filterButtons = document.querySelectorAll('.template-filter__btn');

  // 2. Fungsi untuk menampilkan (*render*) template ke HTML
  const renderTemplates = (filterCategory) => {
    // Kosongkan grid terlebih dahulu
    templateGrid.innerHTML = ''; 

    // Saring data berdasarkan kategori yang diklik
    const filteredTemplates = filterCategory === 'all' 
      ? templates 
      : templates.filter(t => t.category === filterCategory);

    // Tampilkan pesan kosong jika tidak ada template di kategori tersebut
    if (filteredTemplates.length === 0) {
      emptyMessage.removeAttribute('hidden');
    } else {
      emptyMessage.setAttribute('hidden', '');
      
      // Buat elemen HTML untuk setiap template
      filteredTemplates.forEach(template => {
        const article = document.createElement('article');
        article.className = 'demo-card';
        article.innerHTML = `
          <div class="demo-card__preview">
            <img src="${template.image}" alt="Contoh undangan ${template.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/placeholder.jpg'">
          </div>
          <h3 class="demo-card__name">${template.name}</h3>
          <button class="btn btn--outline btn--sm js-open-modal" data-demo="${template.url}">Lihat Undangan</button>
        `;
        templateGrid.appendChild(article);
      });
    }
  };

  // 3. Render awal saat halaman dimuat (tampilkan semua)
  renderTemplates('all');

  // 4. Logika klik tombol filter
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Hapus status aktif dari semua tombol
      filterButtons.forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });

      // Tambahkan status aktif ke tombol yang diklik
      button.classList.add('is-active');
      button.setAttribute('aria-selected', 'true');

      // Ambil kategori dari atribut data-filter dan render ulang
      const filterValue = button.getAttribute('data-filter');
      renderTemplates(filterValue);
    });
  });
});