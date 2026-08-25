/**
 * SHEGER BARBER - PREMIERE MODERN BARBER SHOP JAVASCRIPT
 * Location: Inside Agona Cinema Compound, Addis Ababa, Ethiopia
 * Owner: Eyob Tesfaye | Phone: +251 911 129 206
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Remove Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
    });
    // Fallback if load already fired
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 800);
  }

  // 2. Sticky Navigation Bar & Back to Top Visibility
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      if (backToTopBtn) backToTopBtn.classList.add('active');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('active');
    }
  });

  // Back to Top Button Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Hamburger Menu Drawer Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // 4. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Gallery Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active Class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 6. Appointment Form Validation & Submission
  const appointmentForm = document.getElementById('appointmentForm');
  const successBox = document.getElementById('appointmentSuccess');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve values
      const name = document.getElementById('aptName').value.trim();
      const phone = document.getElementById('aptPhone').value.trim();
      const service = document.getElementById('aptService').value;
      const date = document.getElementById('aptDate').value;
      const time = document.getElementById('aptTime').value;
      const message = document.getElementById('aptMessage').value.trim();

      // Simple Frontend Validation
      if (!name || !phone || !service || !date || !time) {
        alert('Please fill out all required fields before submitting your appointment.');
        return;
      }

      // Display animated success message
      if (successBox) {
        successBox.innerHTML = `
          <i class="fas fa-check-circle" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
          <strong>Thank You, ${name}!</strong><br>
          Your appointment request for <strong>${service}</strong> on <strong>${date} at ${time}</strong> has been submitted successfully.<br>
          ${message ? `<span style="font-size: 0.85rem; color: #c8a45a; margin-top: 0.35rem; display: inline-block;">Note: "${message}"</span><br>` : ''}
          <span style="font-size: 0.85rem; color: #a0a0a0; margin-top: 0.5rem; display: inline-block;">Eyob Tesfaye will contact you at <strong>${phone}</strong> shortly to confirm.</span>
        `;
        successBox.classList.add('active');

        // Scroll success message into view
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Reset form fields
        appointmentForm.reset();
      }
    });
  }

  // 7. Auto-populate Service Selection from Service Cards
  document.querySelectorAll('.service-book-btn, .select-service-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service-name');
      const aptServiceSelect = document.getElementById('aptService');

      if (serviceName && aptServiceSelect) {
        for (let i = 0; i < aptServiceSelect.options.length; i++) {
          if (aptServiceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
            aptServiceSelect.selectedIndex = i;
            break;
          }
        }
      }

      const appointmentSection = document.getElementById('appointment');
      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 8. Gallery Lightbox Modal Viewer
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  if (lightboxModal && lightboxImage) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const cat = item.querySelector('.gallery-category');
        const title = item.querySelector('.gallery-title');

        if (img) {
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt || 'Gallery photo';
          if (lightboxCategory) lightboxCategory.textContent = cat ? cat.textContent : '';
          if (lightboxTitle) lightboxTitle.textContent = title ? title.textContent : '';
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});

