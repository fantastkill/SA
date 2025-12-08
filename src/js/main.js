(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) {
    // Mesmo sem menu mobile, continuar o script
    return;
  }

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
})();

// Preloader: exibir APENAS no primeiro carregamento da sessão (primeira visita)
(function () {
  const hasPreloader = document.getElementById('preloader');
  if (!hasPreloader) return; // página sem preloader

  const alreadyShown = sessionStorage.getItem('sb_preloader_shown') === '1';

  if (alreadyShown) {
    document.body.classList.add('preloader-hide');
  }

  // Garantir remoção ao voltar de páginas internas (bfcache)
  window.addEventListener('pageshow', () => {
    document.body.classList.add('preloader-hide');
  });

  // Primeira visita na aba: mostra e depois oculta
  if (!alreadyShown) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.classList.add('preloader-hide');
        sessionStorage.setItem('sb_preloader_shown', '1');
      }, 1600);
    });
  }
})();


// Removido: carrossel de depoimentos

// Smooth scroll para âncoras
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (id.length <= 1) return;
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Header scroll behavior
let lastScrollY = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
});

// Animações on-scroll simples
const onIntersect = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('in');
  }
};
const io = new IntersectionObserver(onIntersect, { threshold: 0.2 });
document.querySelectorAll('[data-animate]').forEach((el) => io.observe(el));

// Removido: integração do formulário (não há formulário)

// Modal do Imóvel - Versão Otimizada
class PropertyModal {
  constructor() {
    this.currentImageIndex = 0;
    this.images = [];
    this.isTransitioning = false;
    this.init();
  }

  init() {
    // Listener imediato: precisamos do preventDefault sincronamente
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  handleClick(e) {
    const card = e.target.closest('[data-modal]');
    // Só abre modal quando o gatilho tiver atributo data-open-modal
    if (card && e.target.matches('[data-open-modal]')) {
      e.preventDefault();
      const modalId = card.getAttribute('data-modal');
      this.openModal(modalId);
      return;
    }

    if (e.target.matches('[data-modal-close]')) {
      this.closeModal();
      return;
    }

    if (e.target.matches('[data-gallery="prev"]')) {
      this.previousImage();
      return;
    }

    if (e.target.matches('[data-gallery="next"]')) {
      this.nextImage();
      return;
    }

    if (e.target.matches('.thumbnail')) {
      const index = Array.from(e.target.parentNode.children).indexOf(e.target);
      this.setImage(index);
    }
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Coletar imagens de forma otimizada
    const thumbnails = modal.querySelectorAll('.thumbnail');
    this.images = Array.from(thumbnails).map(img => img.src);
    this.currentImageIndex = 0;

    // Mostrar modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Atualizar imagem principal
    this.updateMainImage();
    this.updateThumbnails();
  }

  closeModal() {
    const activeModal = document.querySelector('.property-modal.active');
    if (!activeModal) return;

    activeModal.classList.remove('active');
    activeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  nextImage() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.updateMainImage();
    this.updateThumbnails();
    setTimeout(() => this.isTransitioning = false, 200);
  }

  previousImage() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.images.length - 1 
      : this.currentImageIndex - 1;
    this.updateMainImage();
    this.updateThumbnails();
    setTimeout(() => this.isTransitioning = false, 200);
  }

  setImage(index) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentImageIndex = index;
    this.updateMainImage();
    this.updateThumbnails();
    setTimeout(() => this.isTransitioning = false, 200);
  }

  updateMainImage() {
    const mainImage = document.querySelector('.property-modal.active #main-image');
    if (mainImage && this.images[this.currentImageIndex]) {
      mainImage.src = this.images[this.currentImageIndex];
    }
  }

  updateThumbnails() {
    const activeModal = document.querySelector('.property-modal.active');
    if (!activeModal) return;

    const thumbnails = activeModal.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentImageIndex);
    });
  }
}

// Inicializar modal quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new PropertyModal();
  // Intro minimal: esconde header até clicar em menu
  const body = document.body;
  if (document.querySelector('.intro-minimal')) {
    const header = document.querySelector('.site-header');
    const btn = document.getElementById('introMenuBtn');
    const side = document.getElementById('sideMenu');
    const sideClose = document.getElementById('sideMenuClose');
    const openIntroMenu = ()=>{
      body.classList.add('intro-animating');
      setTimeout(()=>{
        header.classList.remove('intro-hidden');
        body.classList.add('intro-complete');
        side?.classList.add('open');
      }, 300);
    };
    const closeIntroMenu = ()=>{
      side?.classList.remove('open');
      header.classList.add('intro-hidden');
      // retorna logo central
      body.classList.remove('intro-complete');
      // remover estado de animação após pequeno atraso para evitar jump
      setTimeout(()=>{ body.classList.remove('intro-animating'); }, 150);
    };
    btn?.addEventListener('click', openIntroMenu);
    // fechar menu lateral ao clicar fora (mobile-friendly)
    document.addEventListener('click', (e)=>{
      if (!side?.classList.contains('open')) return;
      if (e.target.closest('.side-menu') || e.target.closest('#introMenuBtn')) return;
      closeIntroMenu();
    });
    sideClose?.addEventListener('click', closeIntroMenu);
    side?.querySelectorAll('a').forEach(a=> a.addEventListener('click', closeIntroMenu));
    document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') closeIntroMenu(); });
  }
});

// Carrossel infinito de parceiros - duplicação automática
(function() {
  const partnersTrack = document.querySelector('.partners-track');
  if (!partnersTrack) return;
  
  // Duplicar os cards existentes múltiplas vezes para garantir continuidade
  const originalCards = partnersTrack.innerHTML;
  partnersTrack.innerHTML = originalCards + originalCards + originalCards;
})();

