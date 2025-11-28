/**
 * Main Application Script
 * Melhores práticas: WCAG, Performance, Accessibility
 */

// ============================================
// 1. CRIAÇÃO DAS ESTRELAS
// ============================================
(function initializeStars() {
  const starsContainer = document.querySelector('.stars-container');
  
  if (!starsContainer) return;
  
  const STAR_COUNT = 100;
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.setProperty('--top', Math.random() * 100 + '%');
    star.style.setProperty('--left', Math.random() * 100 + '%');
    star.style.setProperty('--delay', Math.random() * 2 + 's');
    star.setAttribute('aria-hidden', 'true');
    fragment.appendChild(star);
  }
  
  starsContainer.appendChild(fragment);
})();

// ============================================
// 2. ANIMAÇÕES DE ENTRADA (Intersection Observer)
// ============================================
(function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Deixa de observar após animação
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
  });
})();

// ============================================
// 3. BOTÃO VOLTAR AO TOPO
// ============================================
(function initializeBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (!backToTopButton) return;
  
  const SCROLL_THRESHOLD = 300;
  let scrollTimeout;
  
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    }, 100);
  }, { passive: true });
  
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Foca no topo após scroll
    document.body.focus();
  });
})();

// ============================================
// 4. VALIDAÇÃO DE FORMULÁRIO
// ============================================
(function initializeFormValidation() {
  const form = document.querySelector('form');
  
  if (!form) return;
  
  // Validação em tempo real
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });
    
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateInput(input);
      }
    });
  });
  
  // Submissão do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      handleFormSubmit(form);
    }
  });
})();

/**
 * Valida um input
 * @param {HTMLElement} input - Elemento input para validar
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(input) {
  const value = input.value.trim();
  let isValid = true;
  
  if (!value) {
    isValid = false;
  } else if (input.type === 'email') {
    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  } else if (input.minLength) {
    isValid = value.length >= input.minLength;
  }
  
  if (isValid) {
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
  }
  
  return isValid;
}

/**
 * Manipula submissão do formulário
 * @param {HTMLElement} form - Elemento do formulário
 */
function handleFormSubmit(form) {
  try {
    // Simulação de envio
    console.log('Formulário validado com sucesso');
    
    // Aqui você poderia enviar via fetch para um backend
    // fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    
    // Mostrar mensagem de sucesso
    showNotification('Mensagem enviada com sucesso!', 'success');
    
    // Resetar formulário
    form.reset();
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
  }
}

/**
 * Mostra notificação ao usuário
 * @param {string} message - Mensagem a exibir
 * @param {string} type - Tipo de notificação (success/error/info)
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`;
  notification.setAttribute('role', 'alert');
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
  `;
  
  const container = document.querySelector('main');
  container?.insertBefore(notification, container.firstChild);
  
  // Auto-remover após 5 segundos
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// ============================================
// 5. SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================
(function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target && href !== '#') {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

// ============================================
// 6. HEADER SCROLL EFFECT
// ============================================
(function initializeHeaderScrollEffect() {
  const header = document.querySelector('header');
  
  if (!header) return;
  
  let scrollTimeout;
  
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// ============================================
// 7. ACESSIBILIDADE - Navegação por Teclado
// ============================================
(function initializeKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Tecla 'Escape' fecha menus
    if (e.key === 'Escape') {
      document.querySelectorAll('.navbar-collapse.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
})();

// ============================================
// 8. PERFORMANCE - Lazy Loading Manual
// ============================================
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Imagem já tem src, apenas continua carregando naturalmente
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 9. INICIALIZAÇÃO SEGURA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✓ Aplicação carregada com sucesso');
  
  // Verificar suporte a funcionalidades
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver não suportado. Algumas animações podem não funcionar.');
  }
});

// Tratamento de erros global
window.addEventListener('error', (event) => {
  console.error('Erro global:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejection não tratada:', event.reason);
});
