/**
 * DIKI CANDRA LESMANA — PORTFOLIO INTERACTIVITY
 * Project details modal, category filter, custom portrait photo uploader, and animations.
 */

const PROJECT_DETAILS = {
  blessed: {
    tag: 'BLESSED ARTIS MANAGEMENT • APRIL 2025 – SEKARANG',
    title: 'Melaney Ricardo Podcast & Social Media Production',
    subtitle: 'Video Editor & Videographer (Full-Time • Jakarta, Indonesia)',
    points: [
      'Mengelola produksi konten video podcast dan media sosial secara end-to-end untuk figur publik Melaney Ricardo.',
      'Bertanggung jawab penuh atas pengaturan kamera multi-angle, tata pencahayaan studio (lighting), dan peralatan audio untuk memastikan kualitas produksi tinggi.',
      'Mengambil rekaman multi-angle, mengorganisir manajemen aset digital, serta melakukan backup data secara rutin.',
      'Mengedit video podcast berdurasi panjang (long-form YouTube) dan potongan snippet pendek (short-form).',
      'Memproduksi konten video vertikal berdaya tarik tinggi yang dioptimalkan untuk Instagram Reels, TikTok, dan YouTube Shorts sesuai tren algoritma terkini.'
    ],
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Multi-Angle Camera', 'Studio Lighting', 'Audio Production', 'CapCut']
  },
  kab: {
    tag: 'PT. KOMUNITAS ANAK BANGSA • APRIL 2024 – AGUSTUS 2024',
    title: 'TVC Color Grading, Motion Graphics & KOL Campaigns',
    subtitle: 'Video Editor & Videographer (Jakarta, Indonesia)',
    points: [
      'Mengedit konten video pendek dinamis untuk TikTok dan Instagram, termasuk kampanye kolaborasi dengan berbagai KOL dan selebriti.',
      'Memproduksi video podcast dengan standar kualitas audio dan visual broadcast yang tinggi.',
      'Membuat elemen motion graphics dan melakukan color grading profesional untuk Iklan TV (TVC) guna menjaga standar visual brand yang konsisten.',
      'Berkolaborasi erat dengan tim kreatif dalam pengembangan konsep kampanye visual dan penyusunan storyboard.',
      'Mengelola aset video secara efisien untuk memastikan seluruh tenggat waktu pengiriman terpenuhi tepat waktu.'
    ],
    tools: ['DaVinci Resolve', 'Adobe After Effects', 'Adobe Premiere Pro', 'TVC Color Grading', 'Motion Graphics', 'Storyboarding']
  },
  twowheels: {
    tag: 'PROYEK FREELANCE & PT. CIDIGI MULTI INOVASI',
    title: 'Two Wheels Project (YouTube) & Creative Social Production',
    subtitle: 'Creator, Videographer & Video Editor (Indonesia)',
    points: [
      'Two Wheels Project (YouTube): Mengelola kanal otomotif yang berfokus pada performa dan estetika sepeda motor.',
      'Melakukan review produk mendalam, berbagi tips & trik edukatif, serta mengumpulkan data objektif sebagai referensi modifikasi bagi audiens.',
      'PT. Cidigi Multi Inovasi (Sep 2021 – Feb 2022): Memproduksi video menarik dari tahap awal hingga akhir, termasuk pembuatan naskah kreatif.',
      'Mengumpulkan materi pendukung seperti gambar serta cuplikan B-roll untuk proses editing.',
      'Mengunggah hasil video ke media sosial lengkap dengan optimasi deskripsi dan riset tagar relevan untuk memperluas jangkauan audiens.'
    ],
    tools: ['YouTube Production', 'Creative Scripting', 'DSLR / Mirrorless', 'Adobe Photoshop', 'Adobe Lightroom', 'Social Media SEO']
  }
};

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. FILTER TABS FOR SELECTED PROJECTS
     -------------------------------------------------------------------------- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetFilter = tab.getAttribute('data-filter');

      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (targetFilter === 'all' || category === targetFilter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     2. PROJECT DETAIL MODAL
     -------------------------------------------------------------------------- */
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openProjectModal(projectId) {
    const data = PROJECT_DETAILS[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <span class="modal-tag">${data.tag}</span>
      <h3 class="modal-title" id="modalTitle">${data.title}</h3>
      <p class="modal-subtitle">${data.subtitle}</p>
      <ul class="modal-list">
        ${data.points.map((pt) => `<li>${pt}</li>`).join('')}
      </ul>
      <div class="modal-tools">
        ${data.tools.map((tool) => `<span>${tool}</span>`).join('')}
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  modalCloseBtn.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* --------------------------------------------------------------------------
     3. CUSTOM PHOTO REPLACEMENT (PERSISTED IN LOCALSTORAGE)
     -------------------------------------------------------------------------- */
  const changePhotoBtn = document.getElementById('changePhotoBtn');
  const photoUploadInput = document.getElementById('photoUploadInput');
  const heroPortraitImg = document.getElementById('heroPortraitImg');

  // Clear legacy cached portrait if it doesn't match the new version
  localStorage.removeItem('diki_custom_portrait');
  const savedPhoto = localStorage.getItem('diki_custom_portrait_v2');
  if (savedPhoto && heroPortraitImg) {
    heroPortraitImg.src = savedPhoto;
  }

  const modeBtns = document.querySelectorAll('.photo-mode-btn');
  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetSrc = btn.getAttribute('data-src');
      if (targetSrc && heroPortraitImg) {
        heroPortraitImg.src = targetSrc;
        localStorage.removeItem('diki_custom_portrait_v2');
        modeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });

  if (changePhotoBtn && photoUploadInput && heroPortraitImg) {
    changePhotoBtn.addEventListener('click', () => {
      photoUploadInput.click();
    });

    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const resultUrl = ev.target.result;
        heroPortraitImg.src = resultUrl;
        modeBtns.forEach((b) => b.classList.remove('active'));
        try {
          localStorage.setItem('diki_custom_portrait_v2', resultUrl);
        } catch (err) {
          // Ignore storage quota errors for very large raw images
        }
      };
      reader.readAsDataURL(file);
    });
  }
});
